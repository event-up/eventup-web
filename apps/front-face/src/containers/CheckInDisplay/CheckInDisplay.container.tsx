import { FC, useEffect, useState } from 'react';

import audio from '../../assets/checkin-sound.mp3';
import RemovedBGLogo from '../../assets/event_logo.png';
import { Participant } from '@eventup-web/eventup-models';
import coverImg from '../../assets/background_auracle.jpg';
import './CheckInDisplay.container.scss';
import { subscribeToDisplayParticipant } from '@eventup-web/shared';

interface DisplayPageProps {}

const s = new Audio(audio);

const flushString = (str: string) => {
  let res = str.replace('\\xc2\\xa0', '');
  res = res.replace('\\xa0', '');
  return res;
};

export const CheckInDisplayContainer: FC<DisplayPageProps> = () => {
  const [participant, setParticipant] = useState<Participant | undefined>();

  useEffect(() => {
    // Display based on realtime
    const unsub = subscribeToDisplayParticipant((participant) => {
      if (participant) {
        console.log({ participant });
        s.muted = false;
        s.play();
        setParticipant({ ...(participant as Participant) });
        setTimeout(() => {
          setParticipant(undefined);
        }, 6000);
      }
    });
    return () => {
      unsub();
      // off(displayPersonRef);
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
        backgroundPosition: 'center',
        backgroundImage: `url(${coverImg})`,
      }}
      className="bg-black transition-all relative font-[CinzelDecorative]"
    >
      {/* <img
        alt="background"
        style={{
          // height: "100vh",
          // bottom: 0,
          top: 0,
          // transform: " rotate(180deg)",
          position: 'absolute',
          // width: '100vw',
          height: '100vh',
          zIndex: '-1000',
        }}
        src={BackgroundImg}
      /> */}
      <audio id="audioPlayer" src={audio}></audio>
      {participant && (
        <div className="text-2xl text-white text-center">
          <div className="pb-1">
            Hi {flushString(splitFirstName(participant.first_name))},
          </div>
          {participant && <div>WELCOME TO</div>}
        </div>
      )}
      <div
        className="text-center  "
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
            fontFamily: 'CinzelDecorative',
            letterSpacing: 2,
            marginTop: '0px',
          }}
          className="transition-all"
        >
          <img src={RemovedBGLogo} alt="removed_bg_logo" />
        </div>
        {/* <div
          style={{ fontSize: 10, marginTop: '-20px' }}
          className="text-white italic  gold-color  "
        >
          LOLCTech Recreation Club Presents
        </div> */}
      </div>
      {participant ? (
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
          <div className="font-[CinzelDecorative]  text-white text-center">
            <div className="text-[25px]  pb-12 ">
              {participant?.drink_pref !== 'Non Alcoholic' ? (
                <>
                  <div>ENJOY YOUR</div>
                  <div>{participant?.drink_pref}</div>
                </>
              ) : (
                <div>ENJOY THE EVENT</div>
              )}
            </div>

            <div>
              <div className="text-eventPrimary font-bold text-[25px] pb-2">
                YOUR <br /> SEATING ZONE:
              </div>
              <div id="content" className="flex  flex-row justify-center ">
                <div className="  p-5 text-[40px] text-eventPrimary font-bold">
                  {participant?.table_no}
                </div>
              </div>
            </div>
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
