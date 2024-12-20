import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import coverImg from '../../assets/background_auracle.jpg';
import organizerLogo from '../../assets/organizer_logo.png';
import eventLogo from '../../assets/event_logo.png';
import { Participant } from '@eventup-web/eventup-models';
import './QRView.container.scss';
import {
  searchParticipantByRefId,
  subscribeToCheckedInStatusInRealtimeDB,
  subscribeToVotingStatus,
} from '@eventup-web/shared';
import { useRootContext } from '../../app/RootContext';
import { Button, CircularProgress } from '@mui/material';
import { InfoRounded } from '@mui/icons-material';

interface QRViewPageProps {}

export const QRViewAuracle: FC<QRViewPageProps> = () => {
  const { search } = useLocation();
  const { showMessage } = useRootContext();
  const [participant, setParticipant] = useState<Participant>();
  const query = new URLSearchParams(search);
  const refId = query.get('refid');
  const [isloading, setisloading] = useState(true);
  const [votingStatus, setvotingStatus] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const navigate = useNavigate();

  console.log({ refId });

  useEffect(() => {
    if (!refId) return;
    setisloading(false);
    setisloading(true);
    searchParticipantByRefId(refId?.toString())
      .then((participant) => {
        setParticipant(participant);
        console.log({ participant });

        setTimeout(() => {
          setisloading(false);
        }, 1000);
      })
      .catch((e) => {
        console.log({ e });

        showMessage('ERROR', e.message);
      });
  }, [refId]);

  /**
   * Subscription to voting Status
   * TODO: subscribe the voting screens as well
   */
  useEffect(() => {
    const unsubscribe = subscribeToVotingStatus((status) => {
      setvotingStatus(status);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!refId) return;
    const unsub = subscribeToCheckedInStatusInRealtimeDB(refId, (status) => {
      console.log('CheckedInStatusInRealtimeDB', { status });
      setIsCheckedIn(status);
    });

    return () => {
      unsub();
    };
  }, []);

  const navigateToVoting = () => {
    navigate(`vote?refid=${refId}`);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        // height: 'auto',
        // minHeight: '500px',

        // maxWidth: '690px',
        backgroundPosition: 'center',
        backgroundImage: `url(${coverImg})`,
      }}
      className=" font-[CinzelDecorative] flex flex-col  items-center  overflow-scroll    bg-cover text-white "
    >
      {isloading && (
        <div className=" overflow-auto absolute w-full h-full bg-[#ffffffd1]  top-0 z-50 flex justify-center items-center">
          <CircularProgress size={70} />
        </div>
      )}
      {/* <div className=" flex justify-center w-full  pb-2  items-center  ">
        <div
          style={{ backgroundColor: '#d7d6d6c7' }}
          className=" bg-black   p-2  rounded-b-xl flex justify-center "
        >
          <div className=" text-xs pr-1 text-black align-middle flex flex-col justify-center  ">
            <div>customized by</div>
          </div>
          <img width={70} src={eventuplogo} alt="" />
        </div>
      </div> */}
      <div className="h-[50px]"></div>
      <div
        // style={{ backgroundImage: `url(${coverImg})` }}
        className="flex-1 flex-col max-w-[590px]     object-top  text-center justify-center "
      >
        <div className="text-2xl  ">
          <div className="pb-1">Hi {participant?.first_name},</div>
          {isCheckedIn && <div>WELCOME TO</div>}

          {!isCheckedIn && (
            <>
              <div>WE ARE THRILLED</div>
              <div className="pb-2">TO WELCOME YOU AT</div>
            </>
          )}
        </div>

        {<img height={300} src={eventLogo} alt="Event Logo" className="mb-8" />}

        {!isCheckedIn && (
          <div className="flex justify-center rounded-lg shadow-lg pb-10   ">
            <div className="flex justify-center  ">
              <img
                className="border  border-eventPrimary rounded-3xl "
                width={'70%'}
                src={participant?.qrUrl}
                alt="qr"
              />
            </div>
          </div>
        )}

        {isCheckedIn && (
          <>
            <div className="pb-4 text-xl ">
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
              <div className="text-eventPrimary font-bold text-xl pb-2">
                YOUR <br /> SEATING ZONE:
              </div>
              <div id="content" className="flex flex-row justify-center ">
                <div className="  p-5 text-4xl text-eventPrimary font-bold">
                  {participant?.table_no}
                </div>
              </div>
            </div>
          </>
        )}

        {isCheckedIn && (
          <div className="pt-9 pb-11">
            <Button
              disabled={!votingStatus}
              className="font-[CinzelDecorative] "
              onClick={navigateToVoting}
            >
              VOTE FOR AURA QUEEN
            </Button>
            <div hidden={votingStatus} className="text-sm pt-1">
              <InfoRounded /> Voting not started yet
            </div>
          </div>
        )}
      </div>

      <div className=" fixed  flex-auto  bottom-0  flex flex-col justify-end  w-full mt-3   items-center  ">
        <div className=" bg-white p-2 w-[200px] notch-drop-shadow rounded-t-xl flex justify-center">
          <img
            src={organizerLogo}
            alt="LOLC Technologies"
            className="w-[100px]"
          />
          {/* <img src={eventuplogo} alt="" width={40} /> */}
        </div>
      </div>
    </div>
  );
};
