import { off, onValue, ref } from 'firebase/database';
import { FC, useEffect, useState } from 'react';

import BackgroundImg from '../../assets/disco.jpg';
import audio from '../../assets/checkin-sound.mp3';
import RemovedBGLogo from '../../assets/removed_bg.png';
import { Participant } from '@eventup-web/eventup-models';
import { db } from '@eventup-web/shared';

interface DisplayPageProps {}

const s = new Audio(audio);

const flushString = (str: string) => {
  let res = str.replace('\\xc2\\xa0', '');
  res = res.replace('\\xa0', '');
  return res;
};

export const CheckInDisplayContainer: FC<DisplayPageProps> = () => {
  const [first, setFirst] = useState<Participant | undefined>();

  useEffect(() => {
    // Display based on realtime

    const displayPersonRef = ref(db, 'displayParticipant');

    onValue(displayPersonRef, (snapshot) => {
      if (snapshot.val()) {
        s.muted = false;
        s.play();
        setFirst({ ...(snapshot.val() as Participant) });
        setTimeout(() => {
          setFirst(undefined);
        }, 3000);
      }
    });

    return () => {
      off(displayPersonRef);
    };
  }, []);

  const splitFirstName = (name: string) => {
    const names = name.split(' ');
    return names[0];
  };
  console.log('rerender display');

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        zIndex: '-999',
        overflowY: 'hidden',
        position: 'relative',
        flexDirection: 'column',
      }}
      className="bg-black relative"
    >
      <img
        alt="background"
        style={{
          // height: "100vh",
          bottom: 0,
          // transform: " rotate(180deg)",
          position: 'absolute',
          width: '100vw',
          zIndex: '-1000',
        }}
        src={BackgroundImg}
      />
      <audio id="audioPlayer" src={audio}></audio>
      <div
        className="text-center absolute "
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: 100,
          // marginTop: "-200px",
          flexDirection: 'column',
          // marginTop: "-100px",
        }}
      >
        <div
          style={{
            fontSize: 180,
            color: '#FFD700',
            width: '75vw',
            fontFamily: 'MerryChristmasStar',
            letterSpacing: 2,
            marginTop: '0px',
          }}
        >
          <img src={RemovedBGLogo} alt="removed_bg_logo" />
        </div>
        <div
          style={{ fontSize: 10, marginTop: '-20px' }}
          className="text-white italic  gold-color  "
        >
          LOLCTech Recreation Club Presents
        </div>
      </div>
      {first ? (
        <div
          className="animate__animated animate__tada"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '50px',
            // marginTop: "-250px",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontFamily: 'CinzelDecorative',

              // fontWeight: "bold",
              paddingBottom: '50px',
              color: 'white',
              // letterSpacing: 2,
              textAlign: 'center',
            }}
          >
            Welcome!
          </div>
          <div
            className="gold-color"
            style={{
              fontSize: 30,

              maxWidth: '80vw',
              // color: "#FFD700",
              fontFamily: 'CinzelDecorative',
              // letterSpacing: 2,
              fontWeight: 'bold',
              marginTop: '-40px',
              lineHeight: '1.2',
              textAlign: 'center',
            }}
          >
            {flushString(splitFirstName(first.employee_name) || '  ')}
          </div>
        </div>
      ) : null}

      <audio id="embed_player" src={audio} autoPlay={true} />
      {/* <div
          style={{
            width: "100%",
            border: "1px solid white",
            position: "absolute",
            bottom: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "200px",
              }}
              src={lolcLogo}
            />
          </div>
        </div> */}
    </div>
  );
};
