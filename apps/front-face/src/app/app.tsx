import { BrowserRouter } from 'react-router-dom';
import { RootRoutes } from './routes';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { RootContext } from './RootContext';

type SnackBarState = {
  open: boolean;
  type?: 'WARN' | 'ERROR' | 'SUCCESS';
  message?: string;
};

localStorage.setItem('isInitialRaffleScreen', String(true));

export function App() {
  const [snackBarState, setSnackBarState] = useState<SnackBarState>({
    open: false,
  });

  return (
    <BrowserRouter>
      <>
        <Snackbar
          open={snackBarState.open}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          autoHideDuration={1500}
          onClose={() => {
            setSnackBarState({ open: false });
          }}
          style={{ bottom: '10vh', height: 100 }}
        >
          <Alert
            severity={
              snackBarState.type === 'SUCCESS'
                ? 'success'
                : snackBarState.type === 'ERROR'
                ? 'error'
                : 'warning'
            }
            sx={{ width: '100%' }}
          >
            {snackBarState.message}
          </Alert>
        </Snackbar>

        <RootContext.Provider
          value={{
            showMessage: (type, message) => {
              if (type && message) {
                setSnackBarState({ open: true, type, message });
              }
            },
          }}
        >
          <RootRoutes />
        </RootContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
