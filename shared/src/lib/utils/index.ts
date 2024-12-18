const YesNoToBoolean = (str: 'Yes' | 'No') => {
  if (str === 'Yes') return true;
  return false;
};
const BooleanToYesNo = (bool: boolean) => {
  if (bool) return 'Yes';
  return 'No';
};

export const fileToSrc = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error('Failed to convert file to src'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};
export { YesNoToBoolean, BooleanToYesNo };
