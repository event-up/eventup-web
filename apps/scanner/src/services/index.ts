import {
  addContestant,
  incrementCheckInCountRealtimeDB,
  saveParticipant,
  searchParticipantByRefId,
  updateCheckedInStatusInRealtimeDB,
  updateDisplayParticipantRealtimeDB,
} from '@eventup-web/shared';
import { checkCheckPoints } from '../helpers/helpers';
import { Contestant } from '@eventup-web/eventup-models';

export const handleParticipantCheckIn = async (
  participantId: string,
  checkPointCode: string
) => {
  const participant = await searchParticipantByRefId(participantId);

  if (!participant) {
    console.log('Participant not found');
    throw new Error('Participant not found');
  }

  if (checkCheckPoints(checkPointCode, participant)) {
    console.log('Already Checked In!');
    throw new Error(`Already Checked In! to ${checkPointCode}`);
    // alert(`Already Checked In! to ${checkPointCode}`);
    // setQRText(undefined);
  }

  participant.checkIns.push({
    checkedInTime: new Date().toISOString(),
    checkpointCode: checkPointCode,
    isChecked: true,
  });

  //   update DB
  const res = await saveParticipant(participant, participantId);

  /**
   * update the realtime db
   */
  incrementCheckInCountRealtimeDB();

  /**
   * update the realtime db
   */
  updateDisplayParticipantRealtimeDB(participant);
  updateCheckedInStatusInRealtimeDB(participant.ref_id);

  return participant;
};

export const handleCreateContestant = async (contestant: Contestant) => {
  const res = await addContestant(contestant);

  return res;
};
