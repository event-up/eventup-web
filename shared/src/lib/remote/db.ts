import {
  doc,
  DocumentReference,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { fs } from './configs';
import { Contestant, Participant } from '@eventup-web/eventup-models';
import { update } from 'firebase/database';
import { incrementContestantVote } from './realtime';

const PARTICIPANTS_COLLECTION = 'participants';
const CONTESTANTS_COLLECTION = 'contestants';

const getParticipantDocRef = async (refId: string) => {
  const docRef = doc(fs, PARTICIPANTS_COLLECTION, refId);
  return docRef;
};

const getContestantDocRef = async (contestantId: string) => {
  const docRef = doc(fs, CONTESTANTS_COLLECTION, contestantId);

  return docRef;
};

export const searchParticipantByRefId = async (refId: string) => {
  const docRef = await getParticipantDocRef(refId);
  const docSnap = await getDoc(docRef as DocumentReference<Participant>);

  if (!docSnap.exists()) {
    return null;
  }

  const person = docSnap.data();
  return person;
};

export const saveParticipant = async (
  participant: Participant,
  refId: string
) => {
  const docRef = await getParticipantDocRef(refId);

  await setDoc(docRef, {
    ...participant,
  } as Participant);

  return true;
};

export const addContestant = async (contestant: Contestant) => {
  const docRef = doc(fs, 'contestants', contestant.id);

  const docResponse = await setDoc(docRef, {
    ...contestant,
  } as Contestant);

  return docResponse;
};

export const getContestant = async (contestantId: string) => {
  const docRef = await getContestantDocRef(contestantId);
  const docSnap = await getDoc(docRef as DocumentReference<Contestant>);

  if (!docSnap.exists()) {
    return null;
  }

  const contestant = docSnap.data();
  return contestant;
};

export const voteContestant = async (
  contestantId: string,
  participantId: string
) => {
  const participant = await searchParticipantByRefId(participantId);
  const participantDocRef = await getParticipantDocRef(participantId);
  if (!participant) {
    throw new Error('Participant not found');
  }

  const contestant = await getContestant(contestantId);
  const contestantDocRef = await getContestantDocRef(contestantId);
  if (!contestant) {
    throw new Error('Contestant not found');
  }

  if (participant.votes && participant.votes.length >= 3) {
    throw new Error('Participant has already voted 3 times');
  }

  participant.votes.push({ contestantId, timestamp: new Date().toISOString() });

  await updateDoc(contestantDocRef, { votes: increment(1) });
  await updateDoc(participantDocRef, { ...participant });

  // update the realtime ref
  await incrementContestantVote(participantId);

  return true;
};
