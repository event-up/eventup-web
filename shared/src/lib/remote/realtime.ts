import { ref, set } from 'firebase/database';
import { db } from './configs';
import { runTransaction } from 'firebase/database';
import { Participant } from '@eventup-web/eventup-models';

const realtimeCheckInCountRef = ref(db, 'checkInCount');
const realtimeDisplayParticipantRef = ref(db, 'displayParticipant');

export const incrementCheckInCountRealtimeDB = async () => {
  /**
   * update the realtime db
   */
  return await runTransaction(realtimeCheckInCountRef, (data) => {
    if (data !== undefined) {
      data++;
    }
    return data;
  });
};

export const updateDisplayParticipantRealtimeDB = async (
  participant: Participant
) => {
  /**
   * update the realtime db
   **/
  return await runTransaction(realtimeDisplayParticipantRef, (data) => {
    if (!data) {
      set(realtimeDisplayParticipantRef, {
        ...participant,
      });
    }

    data = {
      ...participant,
    };

    return data;
  });
};

export const incrementContestantVote = async (contestantId: string) => {
  const contestantRef = ref(db, `contestants/${contestantId}`);

  return await runTransaction(contestantRef, (data) => {
    if (data !== undefined) {
      data++;
    } else {
      data = 1;
    }
    return data;
  });
};
