import { Participant } from '../components/commonTypes';

export const checkCheckPoints = (
  currentCheckPointCode: string,
  participant: Participant
) => {
  return participant.checkIns.some(
    (ck) => ck.checkpointCode === currentCheckPointCode && ck.isChecked === true
  );
};
