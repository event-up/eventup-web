import styles from './Reference.container.module.scss';
import { AddCircleOutline, CloseRounded } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { ref, runTransaction, set } from 'firebase/database';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db, fs } from '../../app/app';
import { Participant } from '../../components/commonTypes';
import InfoCard from '../../components/InfoCard/InfoCard';
import { checkCheckPoints, YesNoToBoolean } from '../../helpers/helpers';

export function ReferenceContainer(checkPoint: string) {
  const [inputval, setInputVal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [participant, setParticipant] = useState<Participant | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    status: 'DONE' | 'ERROR' | 'WARN';
    msg: string;
  }>();

  const handleSubmit = async () => {
    const realtimeDisplayParticipantRef = ref(db, 'displayParticipant');
    const realtimeParticipantsRef = ref(db, 'checkInCount');

    try {
      setIsLoading(true);
      if (!inputval) return;

      const docref = doc(fs, 'participants', inputval);

      const snap = await getDoc(docref);

      if (!snap.exists()) {
        console.log("can't fined the participant");
        setResponse({ status: 'ERROR', msg: 'Invalid Ref code' });

        return;
      }
      const person = snap.data() as Participant;
      person.checkIns.push({
        checkedInTime: new Date().toISOString(),
        checkpointCode: checkPoint,
        isChecked: true,
      });
      await updateDoc(docref, { checkIns: person.checkIns });

      // Increment the Check-in Count
      await runTransaction(realtimeParticipantsRef, (data) => {
        console.log('data', { data });
        if (data !== undefined) {
          // Increment the Check-in Count

          data++;
        }
        return data;
      });

      // Update for Display
      await runTransaction(realtimeDisplayParticipantRef, (data) => {
        console.log('data display participant', { data });
        if (!data) {
          set(realtimeDisplayParticipantRef, person);
        }

        return data;
      });

      setIsLoading(false);

      setInputVal('');
      setShowModal(false);
      setResponse({ status: 'DONE', msg: 'Successfully Checked In' });
    } catch (error) {
      setResponse({ status: 'ERROR', msg: 'Something went wrong!' });
    }
  };

  const getDetails = async () => {
    if (!inputval) return;

    const docref = doc(fs, 'participants', inputval);

    const snap = await getDoc(docref);

    if (!snap.exists()) {
      console.log("can't fined the participant");
      setResponse({ status: 'ERROR', msg: 'Invalid Ref code' });

      return;
    }
    const data = snap.data() as Participant;
    if (checkCheckPoints(checkPoint, data)) {
      setResponse({ status: 'ERROR', msg: 'Already Checked In' });
      return;
    }
    setParticipant({
      ...data,
      spouse: YesNoToBoolean(data.spouse as any),
      children: data.children.filter((d) => d.name !== ''),
    } as Participant);

    setShowModal(true);
  };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setResponse(undefined);
  //     }, 3000);
  //   }, [response]);

  return (
    <div className={styles['container']}>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          padding: '10px',
          flexDirection: 'column',
          height: '90%',
        }}
      >
        <div
          style={{
            // margin: "10px",
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
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
          {/* <div
    style={{
      width: "90%",
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      minHeight: "80px",
    }}
  >
    {response && (
      <Alert
        style={{ maxWidth: "30%" }}
        variant="filled"
        severity={response?.status === "DONE" ? "success" : "error"}
      >
        {response.msg}
      </Alert>
    )}
  </div> */}
        </div>
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            margin: '10px',
            //   width:'50%'
          }}
        >
          <div
            style={{
              width: '90%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              label="Enter Ref Code here"
              // placeholder="Enter Ref Code here"
              onChange={(e) => {
                setInputVal(e.target.value.toUpperCase());
              }}
              value={inputval}
            />
            <Button
              className="h-full"
              style={{ marginLeft: 10 }}
              variant="contained"
              onClick={getDetails}
            >
              Search
            </Button>
            {/* <IconButton href="" color="primary" onClick={getDetails}>
      <ArrowForwardIosRounded />
    </IconButton> */}
          </div>
        </div>
        <Dialog
          open={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          style={{ width: '100%' }}
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Check-In Details</DialogTitle>
          <DialogContent>
            {participant && (
              <InfoCard
                childrenCount={participant.children.length}
                spouse={participant.spouse}
                email={participant.email}
                name={participant.employee_name}
                refId={participant.ref_id}
                isOk={false}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              endIcon={<CloseRounded />}
              onClick={() => setShowModal(false)}
              autoFocus
            >
              Close
            </Button>
            <Button
              variant="contained"
              endIcon={<AddCircleOutline />}
              onClick={handleSubmit}
              disabled={isLoading}
              autoFocus
            >
              Check In
              {/* {isLoading && <CircularProgress color="info"></CircularProgress>} */}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
