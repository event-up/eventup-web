import styles from './scanner.container.module.scss';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';

import { ref, onValue, runTransaction } from 'firebase/database';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, fs } from '../../app/app';
import InfoCard from '../../components/InfoCard/InfoCard';
import { Participant } from '../../components/commonTypes';

export function ScannerContainer() {
  const [count, setCount] = useState(0);
  const [qrText, setQRText] = useState<string | undefined>();
  const [scannedPerson, setScannedPerson] = useState<Participant | undefined>();
  const [isLoading, setisLoading] = useState(false);

  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const countRef = ref(db, 'checkInCount');
    console.log('init', { countRef });

    const unsub = onValue(
      countRef,
      (snap) => {
        const data = snap.val();
        console.log('COunt update', { data });
        setCount(data);
      },
      (error) => {
        console.log({ error });
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!qrText) return;

    console.log('on data change:::', qrText);
    setisLoading(true);
    parseQRText(qrText).then(
      ({
        data: {
          beverages,
          email,
          emp_no,
          food_preference,
          id,
          name,
          nic,
          vehicle_no,
        },
      }) => {
        handleOnCheckIn({
          drinks: beverages || [],
          email,
          empId: emp_no || '',
          food: food_preference || '',
          id: id || -1,
          nic: nic || '',
          vehicleNo: vehicle_no || '',
          name,
          isWinner: false,
        })
          .then((res) => {
            setisLoading(false);
          })
          .catch((e) => {
            console.log('error:', { e });
            setisLoading(false);
          });
      }
    );
  }, [qrText]);

  const parseQRText = async (text: string) => {
    const url = encodeURIComponent(text);
    const res = await fetch(
      `https://party-qr-lolc-2.herokuapp.com/decrypt?enc_str=` + url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    const resObj = await res.json();

    return resObj;
  };

  const handleOnCheckIn = async (participant: Participant) => {
    console.log('participant', { participant });
    try {
      const docRef = doc(fs, 'participants', participant.email);
      const docSnap = await getDoc(docRef);

      const realtimeParticipantsRef = ref(db, 'checkInCount');

      if (docSnap.exists()) {
        alert('Already Checked In!');
        setQRText(undefined);
      } else {
        const res = await setDoc(docRef, {
          ...participant,
          checkInTime: new Date(),
        });

        const countRes = await runTransaction(
          realtimeParticipantsRef,
          (data) => {
            console.log('data', { data });
            if (data !== undefined) {
              data++;
            }
            return data;
          }
        );
        /** TO Fix IOS issue  */
        // navigator.vibrate(1000);
        setScannedPerson(participant);
        setQRText(undefined);
      }
    } catch (e) {
      alert('Error! ❌');
      console.error('Error Scanning', e);
    }
  };
  return (
    <div className={styles['container']}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.61)',
            height: '100%',
            width: '100%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </div>
      )}

      <Box
        sx={{
          mx: 'auto',
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Stack direction="column" style={{ textAlign: 'center' }}>
          <div>Total Check Ins:</div>
          <Typography variant="h3">{count}</Typography>
          <div>
            <Button
              onClick={() => setShowScanner((prev) => !prev)}
              variant="contained"
              aria-label="upload picture"
              component="span"
              endIcon={showScanner ? <CloseIcon /> : <CameraAltIcon />}
            >
              {showScanner ? 'Close' : 'Start Scan'}
            </Button>
          </div>
        </Stack>
        {showScanner && (
          <QrReader
            scanDelay={2000}
            constraints={{ facingMode: 'environment', latency: 2000 }}
            onResult={(result, error) => {
              if (result) {
                setQRText(result.getText());
              }
            }}
          />
        )}
        {scannedPerson && <InfoCard {...scannedPerson} isOk={true} />}
      </Box>
    </div>
  );
}
