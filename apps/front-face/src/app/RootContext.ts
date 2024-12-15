import { createContext, useContext } from 'react';

export const RootContext = createContext<{
  showMessage: (type: 'WARN' | 'ERROR' | 'SUCCESS', message: string) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showMessage: () => {},
});

export const useRootContext = () => {
  const contextValues = useContext(RootContext);

  return contextValues;
};
