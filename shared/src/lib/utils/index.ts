const YesNoToBoolean = (str: 'Yes' | 'No') => {
  if (str === 'Yes') return true;
  return false;
};
const BooleanToYesNo = (bool: boolean) => {
  if (bool) return 'Yes';
  return 'No';
};

export { YesNoToBoolean, BooleanToYesNo };
