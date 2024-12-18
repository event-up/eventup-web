import styles from './contact.container.module.scss';
import { AddCircleOutline, Done } from '@mui/icons-material';
import {
  Alert,
  Button,
  Chip,
  InputAdornment,
  Snackbar,
  TextField,
} from '@mui/material';
import { ref, runTransaction, set } from 'firebase/database';
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
import { checkCheckPoints } from '../../helpers/helpers';
import InfoCard from '../../components/InfoCard/InfoCard';
import { Participant } from '@eventup-web/eventup-models';
import { db, fs } from '@eventup-web/shared';
import { handleParticipantCheckIn } from '../../services';
import { useRootContext } from '../../app/RootContext';

export function ContactContainer({ checkPoint }: { checkPoint: string }) {
  const [inputval, setInputVal] = useState<string>('');
  const { showMessage } = useRootContext();
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
      const data = o.data() as Participant;
      return {
        ...data,
        // spouse: YesNoToBoolean(data.spouse as any),
        // children: data.children.filter((d) => d.name !== ''),
      };
    });
    console.log({ pl });
    setParticipantsList(pl);
    if (pl.length === 0) {
      showMessage('ERROR', 'No participant found');
    }
  };

  const handleCheckIn = async (participant: Participant) => {
    try {
      setIsLoading(true);

      const updatedParticipant = await handleParticipantCheckIn(
        participant.ref_id,
        checkPoint
      );

      setIsLoading(false);
      setInputVal('');
      await queryFirestore();
    } catch (error: any) {
      console.log({ error });
      showMessage('ERROR', error.message);
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
                    name={participant.employee_name}
                    tableNo={participant.table_no}
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
      </div>
    </div>
  );
}
