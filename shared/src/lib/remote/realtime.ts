import { off, onValue, ref, set } from 'firebase/database';
import { db } from './configs';
import { runTransaction } from 'firebase/database';
import { Participant } from '@eventup-web/eventup-models';

const realtimeCheckInCountRef = ref(db, 'checkInCount');
const realtimeDisplayParticipantRef = ref(db, 'displayParticipant');
const CONTESTANTS_COLLECTION = 'contestants';
const PARTICIPANT_COLLECTION = 'participants';
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

export const subscribeToAllVoteCountUpdates = (
  cb: (data: { [key: string]: number }) => void
) => {
  const contestantsRef = ref(db, CONTESTANTS_COLLECTION);
  return onValue(contestantsRef, (snapshot) => {
    console.log(snapshot.val());
    cb(snapshot.val());
  });
};

/**
 * Voting Flag
 */
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

export const updateCheckedInStatusInRealtimeDB = async (
  participantId: string
) => {
  const participantRef = ref(
    db,
    `${PARTICIPANT_COLLECTION}/${participantId}/checkedIn`
  );
  return await runTransaction(participantRef, (data) => {
    data = true;

    return data;
  });
};

export const subscribeToCheckedInStatusInRealtimeDB = (
  participantID: string,
  cb: (checkedIn: boolean) => void
) => {
  const participantRef = ref(
    db,
    `${PARTICIPANT_COLLECTION}/${participantID}/checkedIn`
  );
  return onValue(participantRef, (snapshot) => {
    cb(snapshot.val());
  });
};
