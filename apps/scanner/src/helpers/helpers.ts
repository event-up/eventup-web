import { Participant } from '@eventup-web/eventup-models';

export const checkCheckPoints = (
  currentCheckPointCode: string,
  participant: Participant
) => {
  return participant.checkIns.some(
    (ck) => ck.checkpointCode === currentCheckPointCode && ck.isChecked === true
  );
};

export const YesNoToBoolean = (str: 'Yes' | 'No') => {
  if (str === 'Yes') return true;
  return false;
};

export const BooleanToYesNo = (bool: boolean) => {
  if (bool) return 'Yes';
  return 'No';
};
