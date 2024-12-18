import styles from './scanner.container.module.scss';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Stack,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { HighlightOff } from '@mui/icons-material';

import QrScanner from 'qr-scanner';
import { Participant } from '@eventup-web/eventup-models';
import { handleParticipantCheckIn } from '../../services';
import { useRootContext } from '../../app/RootContext';

export function ScannerContainer({
  checkPointCode,
}: {
  checkPointCode: string;
}) {
  const { showMessage } = useRootContext();
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
    if (!qrText) return;

    console.log('QR Text changed:::', qrText);

    handleOnCheckIn(qrText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrText]);

  const handleOnCheckIn = async (refId: string) => {
    try {
      setisLoading(true);
      const updatedParticipant = await handleParticipantCheckIn(
        refId,
        checkPointCode
      );

      setScannedPerson({
        ...updatedParticipant,
      });

      setTimeout(() => {
        setScannedPerson(undefined);
      }, 4000);

      setisLoading(false);
    } catch (e) {
      // Errors are caught here
      const error = e as Error;
      showMessage('ERROR', error.message);
      console.error('Error Scanning', e);
      setisLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect', { camState });
    if (camState) qrScanner.current?.setCamera(camState);
  }, [camState]);

  return (
    <div className={styles['container']}>
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
            <ul style={{ fontSize: 30 }}></ul>
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
