import { BooleanToYesNo, YesNoToBoolean } from '@eventup-web/shared';
import styles from './CheckInDisplay.container.module.scss';
import { Participant } from '@eventup-web/eventup-models';
import { Tag } from '@mui/icons-material';
import { ref, onValue, off } from 'firebase/database';
import { useState, useEffect } from 'react';
import { db } from '../../app/app';

export function CheckInDisplayContainer() {
  // const s = new Audio(audio);

  const flushString = (str = '') => {
    let res = str?.replace('\\xc2\\xa0', '');
    res = res.replace('\\xa0', '');
    return res;
  };
  const [first, setfirst] = useState<Participant | undefined>();

  useEffect(() => {
    // Display based on realtime

    const displayPersonRef = ref(db, 'displayParticipant');

    onValue(displayPersonRef, (snapshot) => {
      const snap = snapshot.val();
      if (snap) {
        // s.muted = false;
        // s.play();
        setfirst({
          ...(snap as Participant),
          spouse: YesNoToBoolean(snap.spouse),
          children: snap.children.filter((child: any) => child.name !== ''),
        });
        setTimeout(() => {
          setfirst(undefined);
        }, 4000);
      }
    });

    return () => {
      off(displayPersonRef);
    };
  }, []);

  const processName = (name: string) => {
    if (name.includes(' ')) {
      const names = name.split(' ');
      return names[names.length - 1];
    } else if (name.includes('.')) {
      const names = name.split('.');
      return names[names.length - 1];
    }
    return name;
  };
  console.log('rerender display');

  return (
    <div className={styles['container']}>
      <div style={{ height: '100vh' }}>
        <div
          style={{
            height: '100%',
            // backgroundImage: `url(${bgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div
            className=" flex h-max "
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <div className="flex direction-row align-center pb-6   ">
              {/* <img
                id="display-logo"
                width="150px"
                height="140px"
                style={{ paddingRight: '30px' }}
                src={lolcLogo}
              /> */}
              <div style={{ alignItems: 'left' }} className="flex flex-col ">
                <div
                  style={{
                    color: '#004ea0',
                    textAlign: 'left',
                    textShadow: '0px -7px 11px rgba(255,255,255,0.99)',
                    fontSize: 80,
                    fontFamily: 'PWHappyChristmas',
                  }}
                >
                  Kids Winter
                </div>
                <div
                  style={{
                    color: '#d40004',
                    fontSize: 100,
                    lineHeight: 1,
                    // backgroundColor: "white",
                    textShadow: '0px -7px 11px rgba(255,255,255,0.99)',
                    fontFamily: 'PWHappyChristmas',
                  }}
                >
                  Wonderland 2023
                </div>
              </div>
            </div>

            <div
              id="main-panel"
              className="relative  overflow-hidden md:w-1/2"
              style={{
                backgroundColor: 'transparent',
                width: '60%',
                borderRadius: 10,
                minHeight: '60vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                zIndex: 0,
              }}
            >
              <div
                id="inner-panel"
                className="overflow-hidden w-full align-middle flex justify-center"
                style={{ backgroundColor: 'white', height: '100%', zIndex: 2 }}
              >
                <div className="flex text-lg flex-row  pr-4  w-full align-center  space-x-1 absolute bottom-4 opacity-60 italic justify-center">
                  <div>Presented by</div>
                  {/* <img id="display-logo " width="50px" src={spiritLogo} /> */}
                </div>
                <div
                  style={{
                    minHeight: '500px',
                    // paddingTop: "50px",

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  className="flex flex-row w-full"
                >
                  {/* <audio id="audioPlayer" src={audio}></audio> */}

                  {first && (
                    <>
                      {/* <div className="border-solid border-r-2 border-black "> */}
                      <div className=" flex-1 animate__animated animate__tada">
                        <div
                          style={{
                            fontSize: 80,
                            fontFamily: 'MerryChristmasStar',
                            // fontWeight: "bold",
                            color: '#00358e',
                            lineHeight: 1,
                            letterSpacing: 1.5,
                            marginBottom: '2px',
                          }}
                        >
                          Welcome!
                        </div>
                        <div
                          style={{
                            fontSize: 120,
                            color: '#ee031d',
                            fontFamily: 'PlayfulChristmas',
                            lineHeight: 0.8,
                            letterSpacing: 1,
                            marginTop: 10,
                          }}
                        >
                          {processName(flushString(first.employee_name))}
                        </div>
                      </div>
                      {/* verticle devider */}
                      {/* <div className="h-[80%] border-r-2 border-gray-300 "></div> */}
                      {/* </div> */}
                      <div
                        className="flex-1 font-serif flex justify-center text-[40px]  mt-6 "
                        // style={{ letterSpacing: 0.5 }}
                      >
                        <div>
                          <ul>
                            <li className="">
                              Spouse attending :
                              <Tag type={BooleanToYesNo(first.spouse)}>
                                {BooleanToYesNo(first.spouse)}
                              </Tag>
                            </li>
                            <li>
                              Kids : {`(${first.children.length})`}
                              <span className="flex space-x-1 space-y-1 flex-col justify-center">
                                {first.children.map((child, index) => {
                                  return (
                                    <Tag key={index} type={'No'}>
                                      {child.name}
                                    </Tag>
                                  );
                                })}
                              </span>{' '}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}

                  {/* <audio id="embed_player" src={audio} autoPlay={true} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 15,
            marginTop: '10px',
            bottom: 0,
            width: '100%',
            zIndex: 1,
            alignItems: 'center',
          }}
          className=" align-middle  backdrop-blur-xl  bg-white/50 text-black py-5 flex align-center justify-center absolute space-x-5"
        >
          <div className="flex flex-row align-center  space-x-1">
            <div className=" ">Powered by</div>
            {/* <img width={30} src={eventupicon} alt="" /> */}
            <div className="bg-[#0494b4] px-2  text-white py-1  rounded-3xl">
              eventup.lk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
