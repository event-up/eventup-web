import styles from './contact.container.module.scss';
import { AddCircleOutline, Done } from '@mui/icons-material';
import { Button, Chip, InputAdornment, TextField } from '@mui/material';
import { ref, runTransaction } from 'firebase/database';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { db, fs } from '../../app/app';
import { Participant } from '../../components/commonTypes';
import InfoCard from '../../components/InfoCard/InfoCard';
import { checkCheckPoints } from '../../helpers/helpers';

export function ContactContainer(checkPoint: string) {
  const [inputval, setInputVal] = useState<string>('');
  const [participantsList, setParticipantsList] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const participantsRef = collection(fs, 'participants');

  const queryFirestore = async () => {
    if (!inputval) return;

    const q = query(
      participantsRef,
      where('mobileNo', 'array-contains', '94' + inputval)
    );
    const querySnapShot = await getDocs(q);
    const pl = querySnapShot.docs.map((o) => {
      return o.data() as Participant;
    });
    console.log({ pl });
    setParticipantsList(pl);
  };

  const handleCheckIn = async (participant: Participant) => {
    const realtimeDisplayParticipantRef = ref(db, 'displayParticipant');
    const realtimeParticipantsRef = ref(db, 'checkInCount');

    try {
      setIsLoading(true);
      if (!inputval) return;

      const docref = doc(fs, 'participants', participant.ref_id);

      const snap = await getDoc(docref);

      if (!snap.exists()) {
        console.log("can't fined the participant ");
        // setResponse({ status: "ERROR", msg: "Invalid Ref code" });

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

      // // Update for Display
      // await runTransaction(realtimeDisplayParticipantRef, (data) => {
      //   console.log("data display participant", { data });
      //   if (!data) {
      //     set(realtimeDisplayParticipantRef, person);
      //   }

      //   return person;
      // });

      setIsLoading(false);

      setInputVal('');
      await queryFirestore();

      //   setShowModal(false);
      //   setResponse({ status: "DONE", msg: "Successfully Checked In" });
    } catch (error) {
      console.log(error);

      //   setResponse({ status: "ERROR", msg: "Something went wrong!" });
    }
  };
  return (
    <div className={styles['container']}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            marginTop: '0px',

            justifyContent: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '15px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <TextField
                label="Enter phone number here"
                placeholder="7xxxxxxxxx"
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
                value={inputval}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">94</InputAdornment>
                  ),
                }}
              />

              <Button
                style={{ marginLeft: 10 }}
                variant="contained"
                onClick={queryFirestore}
              >
                Search
              </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
              {participantsList.map((participant) => (
                <div style={{ marginBottom: '5px' }}>
                  <InfoCard
                    email={participant.email}
                    isOk={false}
                    name={participant.first_name}
                    refId={participant.ref_id}
                  >
                    {!checkCheckPoints(checkPoint, participant) && (
                      <Button
                        style={{ marginLeft: '-8px' }}
                        variant="contained"
                        endIcon={<AddCircleOutline />}
                        onClick={() => handleCheckIn(participant)}
                        disabled={isLoading}
                        autoFocus
                      >
                        Check In
                      </Button>
                    )}
                    {checkCheckPoints(checkPoint, participant) && (
                      <Chip
                        icon={<Done />}
                        style={{ marginLeft: '-8px' }}
                        color="success"
                        size="small"
                        label={'Checked In'}
                      />
                    )}
                  </InfoCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
}
