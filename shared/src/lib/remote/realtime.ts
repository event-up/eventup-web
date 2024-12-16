import { off, onValue, ref, set } from 'firebase/database';
import { db } from './configs';
import { runTransaction } from 'firebase/database';
import { Participant } from '@eventup-web/eventup-models';

const realtimeCheckInCountRef = ref(db, 'checkInCount');
const realtimeDisplayParticipantRef = ref(db, 'displayParticipant');
const CONTESTANTS_COLLECTION = 'contestants';
const CONFIG_VOTING_STATUS = 'configs/votingStatus';

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

export const toggleVotingStatus = async (status: boolean) => {
  const votingStatusRef = ref(db, CONFIG_VOTING_STATUS);
  return await runTransaction(votingStatusRef, (data) => {
    data = status;

    return data;
  });
};

export const subscribeToVotingStatus = (cb: (data: boolean) => void) => {
  const votingStatusRef = ref(db, CONFIG_VOTING_STATUS);
  return onValue(votingStatusRef, (snapshot) => {
    cb(snapshot.val());
  });
};

export const subscribeToContestantVote = (
  contestantId: string,
  cb: (data: number) => void
) => {
  const contestantRef = ref(db, `${CONTESTANTS_COLLECTION}/${contestantId}`);
  return onValue(contestantRef, (snapshot) => {
    if (snapshot.val()) {
      cb(snapshot.val());
    }
  });
};
