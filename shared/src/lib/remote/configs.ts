'use client';
import { getMessaging } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

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

const db = getDatabase(app);
const fs = getFirestore(app);
const messaging = getMessaging(app);
const storage = getStorage(app);
export { db, fs, messaging, storage };
