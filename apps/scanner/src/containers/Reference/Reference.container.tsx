import styles from './Reference.container.module.scss';
import { AddCircleOutline, CloseRounded } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Participant } from '@eventup-web/eventup-models';
import { useState } from 'react';
import InfoCard from '../../components/InfoCard/InfoCard';
import { searchParticipantByRefId } from '@eventup-web/shared';
import { handleParticipantCheckIn } from '../../services';
import { useRootContext } from '../../app/RootContext';

export function ReferenceContainer({ checkPoint }: { checkPoint: string }) {
  const [inputval, setInputVal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [participant, setParticipant] = useState<Participant | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useRootContext();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (!inputval) return;

      const updatedParticipant = await handleParticipantCheckIn(
        inputval,
        checkPoint
      );

      showMessage('SUCCESS', 'Successfully Checked In');
      setInputVal('');
      setIsLoading(false);
      setShowModal(false);
    } catch (error: any) {
      setIsLoading(false);
      showMessage('ERROR', error.message);
    }
  };

  const getDetails = async () => {
    try {
      if (!inputval) return;

      const updatedParticipant = await searchParticipantByRefId(inputval);

      setParticipant({
        ...updatedParticipant,
      } as Participant);

      setShowModal(true);
    } catch (e: any) {
      console.log({ e });
      showMessage('ERROR', e.message);
    }
  };

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
                childrenCount={0}
                spouse={false}
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
