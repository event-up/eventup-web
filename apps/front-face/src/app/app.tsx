import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getMessaging } from 'firebase/messaging';
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

const firebaseConfig = {
  apiKey: 'AIzaSyBK1HDFzWJw0DbNHA1Gpp6WoLCbnL0c94U',
  authDomain: 'party-qr-kiddies.firebaseapp.com',
  databaseURL:
    'https://party-qr-kiddies-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'party-qr-kiddies',
  storageBucket: 'party-qr-kiddies.appspot.com',
  messagingSenderId: '291907730539',
  appId: '1:291907730539:web:9fa6c4a4308e4b9dc8452e',
  measurementId: 'G-9T87C8LTMQ',
};

export const app = initializeApp(firebaseConfig);
localStorage.setItem('isInitialRaffleScreen', String(true));
const db = getDatabase(app);
const fs = getFirestore(app);
const messaging = getMessaging(app);
export { db, fs, messaging };

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
