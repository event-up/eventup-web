import { BrowserRouter } from 'react-router-dom';
import { RootRoutes } from './routes';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBfhl0rgY5wd9vUStADdbksDdLUlNhwVL0',
  authDomain: 'party-qr-reader-christmas.firebaseapp.com',
  databaseURL:
    'https://party-qr-reader-christmas-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'party-qr-reader-christmas',
  storageBucket: 'party-qr-reader-christmas.appspot.com',
  messagingSenderId: '78984338478',
  appId: '1:78984338478:web:6fee7ac721d7b4814e13bf',
  measurementId: 'G-B37F53Q8C8',
};

export const app = initializeApp(firebaseConfig);
localStorage.setItem('isInitialRaffleScreen', String(true));
const db = getDatabase(app);
const fs = getFirestore(app);
const messaging = getMessaging(app);
export { db, fs, messaging };

export function App() {
  return (
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  );
}

export default App;
