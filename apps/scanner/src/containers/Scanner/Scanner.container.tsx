import styles from './scanner.container.module.scss';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Stack,
} from '@mui/material';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { useEffect, useRef, useState } from 'react';
import { HighlightOff } from '@mui/icons-material';
import { ref, runTransaction, set } from 'firebase/database';
import { DocumentReference, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  BooleanToYesNo,
  checkCheckPoints,
  YesNoToBoolean,
} from '../../helpers/helpers';
import { app, db, fs } from '../../app/app';
import QrScanner from 'qr-scanner';
import { Participant } from '@eventup-web/eventup-models';

export function ScannerContainer(checkPointCode: string) {
  const analitics = getAnalytics(app);
  const [response, setResponse] = useState<{
    status: 'DONE' | 'ERROR' | 'WARN';
    msg: string;
  }>();

  const [qrText, setQRText] = useState<string | undefined>();
  const [scannedPerson, setScannedPerson] = useState<Participant | undefined>();
  const [isLoading, setisLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [camState, setCamState] = useState<'user' | 'environment'>();

  const videoRef = useRef<HTMLVideoElement>();
  const qrScanner = useRef<QrScanner>();

  useEffect(() => {
    if (!videoRef.current) return;
    const qr = new QrScanner(
      videoRef.current,
      (result: any) => {
        console.log('result', result);
        setQRText(result.data);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,

        // maxScansPerSecond: 10,
      }
    );

    console.log({ qr });

    qr.start();

    qrScanner.current = qr;

    /**
     * Reload the app for cache clearing
     * refresh after every 30 mins
     */
    setTimeout(() => {
      window.location.reload();
    }, 60 * 60 * 1000);

    return () => {
      qrScanner.current?.stop();

      qrScanner.current?.destroy();
    };
  }, [videoRef, showScanner]);

  useEffect(() => {
    logEvent(analitics, 'page_view', { page_title: 'scanner' });
  }, []);

  useEffect(() => {
    if (!qrText) return;
    logEvent(analitics, 'function', { place: 'useEffect', qrText });

    console.log('on data change:::', qrText);
    setisLoading(true);

    handleOnCheckIn(qrText)
      .then((res) => {
        setisLoading(false);
      })
      .catch((e) => {
        console.log('error:', { e });
        setisLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrText]);

  const handleOnCheckIn = async (refId: string) => {
    console.log('participant', { refId });

    try {
      const docRef = doc(fs, 'participants', refId);
      const docSnap = await getDoc(docRef as DocumentReference<Participant>);
      // const docSnap = await getDoc<Participant, DocumentReference<Participant>>(
      //   docRef
      // );

      const realtimeParticipantsRef = ref(db, 'checkInCount');
      const realtimeDisplayParticipantRef = ref(db, 'displayParticipant');

      if (!docSnap.exists()) {
        // invalid ref
        console.log("Can't find the Participant");
      }

      const person = docSnap.data();

      console.log({ person });

      if (!person) {
        console.log('No participant data');
        return;
      }

      if (checkCheckPoints(checkPointCode, person)) {
        setResponse({ msg: 'Already Checked In! ', status: 'ERROR' });
        // alert(`Already Checked In! to ${checkPointCode}`);
        // setQRText(undefined);
      } else {
        person.checkIns.push({
          checkedInTime: new Date().toISOString(),
          checkpointCode: checkPointCode,
          isChecked: true,
        });

        /**
         * Update the document
         */
        await setDoc(docRef, {
          ...person,
        } as Participant);

        /**
         * update the realtime db
         */
        await runTransaction(realtimeParticipantsRef, (data) => {
          console.log('data', { data });
          if (data !== undefined) {
            data++;
          }
          return data;
        });

        /**
         * update the realtime db
         */
        await runTransaction(realtimeDisplayParticipantRef, (data) => {
          console.log('data display participant', { data });
          if (!data) {
            set(realtimeDisplayParticipantRef, {
              ...person,
            });
          }
          data = {
            ...person,
          };
          return data;
        });

        /** TO Fix IOS issue  */
        // navigator.vibrate(1000);
        setScannedPerson({
          ...person,
          spouse: YesNoToBoolean(person.spouse as any),
          children: person.children.filter((child: any) => child.name !== ''),
        });

        setTimeout(() => {
          setScannedPerson(undefined);
        }, 4000);
        // setQRText(undefined);
      }
    } catch (e) {
      alert('Error! ❌');
      console.error('Error Scanning', e);
    }
  };

  useEffect(() => {
    console.log('useEffect', { camState });
    if (camState) qrScanner.current?.setCamera(camState);
  }, [camState]);

  return (
    <div className={styles['container']}>
      <Snackbar
        open={response !== undefined}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        autoHideDuration={1500}
        onClose={() => setResponse(undefined)}
        style={{ bottom: '10vh' }}
      >
        <Alert
          severity={
            response?.status === 'DONE'
              ? 'success'
              : response?.status === 'ERROR'
              ? 'error'
              : 'warning'
          }
          sx={{ width: '100%' }}
        >
          {response?.msg}
        </Alert>
      </Snackbar>

      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.61)',
            height: '100%',
            width: '100%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </div>
      )}

      <Box
        sx={{
          mx: 'auto',
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Stack
          direction="column"
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          {/* <div>
            <Button
              onClick={() => setShowScanner((prev) => !prev)}
              variant="contained"
              aria-label="upload picture"
              component="span"
              endIcon={showScanner ? <CloseIcon /> : <CameraAltIcon />}
            >
              {showScanner ? "Close" : "Start Scan"}
            </Button>
          </div> */}
          <IconButton
            size="large"
            onClick={() =>
              setCamState((prev) => (prev === 'user' ? 'environment' : 'user'))
            }
          >
            <CameraswitchIcon style={{ fontSize: 30 }}></CameraswitchIcon>
            {/* <HighlightOff style={{ fontSize: 30 }} /> */}
          </IconButton>
          <div
            className="md:max-w-[780px]"
            style={{ width: '75vw', borderRadius: 10 }}
            id="video-container"
          >
            <video style={{ borderRadius: 10 }} ref={videoRef as any}></video>
          </div>
        </Stack>
        {/* {showScanner && (
          <QrReader
            // ViewFinder={ViewFinder}
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              // setScannedPerson(undefined);
              console.log("qr READ:::", { test: result?.getText(), qrText });

              if (
                !!result &&
                result.getText().toLowerCase() !== qrText?.toLowerCase()
              ) {
                setQRText(result.getText());
              }
            }}
          />
        )} */}

        <Backdrop
          sx={{
            textAlign: 'center',
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          className=" backdrop-blur-xl  bg-white/50"
          open={scannedPerson !== undefined}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => {}}
        >
          <Stack
            style={{
              textAlign: 'center',
              display: 'flex',
              justifyItems: 'center',
            }}
          >
            <div>
              <CheckCircleIcon sx={{ color: '#4cbb17', fontSize: 100 }} />
            </div>
            <div style={{ fontSize: 20 }}>Checked In</div>
            <div style={{ fontSize: 30 }}>{scannedPerson?.employee_name}</div>
            <ul style={{ fontSize: 30 }}>
              <li>
                Spouse attending :{' '}
                {BooleanToYesNo(scannedPerson?.spouse || false)}
              </li>
              <li>Kids count : {scannedPerson?.children.length}</li>
            </ul>
            <IconButton
              style={{ color: 'white', marginTop: 20 }}
              size="large"
              aria-label="delete"
              onClick={() => setScannedPerson(undefined)}
            >
              <HighlightOff style={{ fontSize: 30 }} />
            </IconButton>
          </Stack>
        </Backdrop>
      </Box>
    </div>
  );
}
