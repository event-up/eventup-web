import { doc, getDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import coverImg from '../../assets/background_auracle.jpg';
import organizerLogo from '../../assets/organizer_logo.png';
import eventLogo from '../../assets/event_logo.png';
import eventTagline from '../../assets/event-tagline.png';
import { Participant } from '@eventup-web/eventup-models';
import eventuplogo from '../../assets/eventup.png';
import './QRView.container.scss';
import {
  searchParticipantByRefId,
  subscribeToCheckedInStatusInRealtimeDB,
  subscribeToVotingStatus,
} from '@eventup-web/shared';
import { useRootContext } from '../../app/RootContext';
import { Button } from '@mui/material';
import { InfoRounded } from '@mui/icons-material';

interface QRViewPageProps {}

const eventTable = [
  {
    title: 'Location',
    value: 'Lotus Tower, Lake Side',
  },
  {
    title: 'Time',
    value: '7.00 pm - 3.30am',
  },
  {
    title: 'Date',
    value: '13th October ',
  },
];
export const QRViewAuracle: FC<QRViewPageProps> = () => {
  const { search } = useLocation();
  const { showMessage } = useRootContext();
  const [participant, setParticipant] = useState<Participant>();
  const query = new URLSearchParams(search);
  const refId = query.get('refid');
  const [votingStatus, setvotingStatus] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const navigate = useNavigate();

  console.log({ refId });

  useEffect(() => {
    if (!refId) return;

    searchParticipantByRefId(refId?.toString())
      .then((participant) => {
        setParticipant(participant);
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
      console.log('valueee', { status });
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
        minHeight: '760px',
        // maxWidth: '690px',
        backgroundImage: `url(${coverImg})`,
      }}
      className="font-[CinzelDecorative] flex flex-col justify-center items-center   bg-cover text-white "
    >
      <div
        // style={{ backgroundImage: `url(${coverImg})` }}
        className="flex flex-col max-w-[590px]   object-top  text-center justify-center "
      >
        <div className="text-2xl">
          <div className="pb-1">Hi {participant?.first_name},</div>
          {isCheckedIn && <div>WELCOME TO</div>}

          {!isCheckedIn && (
            <>
              <div>WE ARE THRILLED</div>
              <div className="pb-2">TO WELCOME YOU AT</div>
            </>
          )}
        </div>

        {<img height={300} src={eventLogo} alt="Event Logo" />}
        {/* <div className="text-sm pb-8 font-bold shadow-lg text-yellow-50">
          THE AURA OF MAGIC, THE ORACLE OF MOMENTS
        </div> */}
        <img
          height={300}
          src={eventTagline}
          alt="event tag line"
          className="mt-[-20px]"
        />

        {!isCheckedIn && (
          <div className="flex justify-center         rounded-lg shadow-lg   ">
            <div className="flex justify-center    ">
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
            <div className="pb-4">
              <div>ENJOY YOUR</div>
              <div>{participant?.drinksPref || 'VODKA'}</div>
            </div>

            <div>
              <div className="text-eventPrimary font-bold text-xl pb-2">
                YOUR TABLE NO:
              </div>
              <div id="content" className="flex flex-row justify-center ">
                <div className="p-5 text-5xl text-eventPrimary font-bold   corder-borders">
                  {participant?.tableNo || '05'}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="pt-9">
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
      </div>
      <div className=" fixed flex justify-center w-full  bottom-0  items-center  ">
        <div className=" bg-white p-4 w-[40%] rounded-t-xl flex justify-center">
          <img src={organizerLogo} alt="LOLC Technologies" className="w-24" />
          {/* <img src={eventuplogo} alt="" /> */}
        </div>
      </div>

      <div className=" fixed flex justify-center w-full  top-0  items-center  ">
        <div
          style={{ backgroundColor: '#d7d6d6c7' }}
          className=" bg-black   p-2  rounded-b-xl flex justify-center "
        >
          {/* <img src={organizerLogo} alt="LOLC Technologies" className="w-24" /> */}
          <div className=" text-xs pr-1 text-black align-middle flex flex-col justify-center  ">
            <div>customized by</div>
          </div>
          <img width={70} src={eventuplogo} alt="" />
        </div>
      </div>
    </div>
  );
};
