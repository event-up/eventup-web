import { doc, getDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import coverImg from '../../assets/disco.jpg';
import lolcLogo from '../../assets/LOLC_Technologies.png';
import eventLogo from '../../assets/event_logo.png';
import { Participant } from '@eventup-web/eventup-models';
import { searchParticipantByRefId } from '@eventup-web/shared';
import { useRootContext } from '../../app/RootContext';

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
export const QRViewContainer: FC<QRViewPageProps> = () => {
  const { search } = useLocation();
  const { showMessage } = useRootContext();
  const [participant, setParticipant] = useState<Participant>();
  const query = new URLSearchParams(search);
  const refId = query.get('refid');

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

  console.log({ participant });

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
      }}
      className="flex flex-col"
    >
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="flex-none object-top max-h-[400px] h-2/5  align-middle bg-cover bg-slate-400 bg-bottom"
      >
        <div className="pt-[60px] flex justify-center">
          <img alt="event_logo" width={'80%'} src={eventLogo}></img>
        </div>
      </div>

      <div className="align-center   relative flex flex-row justify-center">
        <div className=" w-[300px] absolute top-[-50px]    border  rounded-lg shadow-lg  ">
          {!participant?.qrUrl && (
            <div
              className="p-5 min-w-[300px] min-h-[300px] text-center align-middle"
              style={{ fontSize: 25 }}
            >
              Loading...
            </div>
          )}

          {participant?.qrUrl && (
            <img
              alt="qr code"
              src={participant?.qrUrl}
              className="max-w-[300px]  border  rounded-lg "
              // style={{ maxWidth: "500px", maxHeight: "500px" }}
            ></img>
          )}
        </div>
      </div>
      <div className="flex-1 pt-[200px] text-center px-10 flex justify-center items-center align-middle flex-col ">
        <a href={participant?.qrUrl} className="text-sm underline pb-10">
          View Full Screen
        </a>
        <div className="text-3xl font-bold truncate text-center max-w-xs md:max-w-none">
          {participant?.employee_name}
        </div>
        <div className="text-xl">
          This is your QR pass for the{' '}
          <span className="font-semibold">AURACLE </span> Please present this at
          the entrance.
        </div>

        <div className="pt-3">
          20th December, 6.30pm Onwards @ Cinnamon Life.
        </div>
        {/* <div className=" flex align-middle justify-center">
          <table className=" ">
            {eventTable.map((t) => (
              <tr>
                <td className="font-semibold pr-5 ">{t.title}</td>
                <td className="">{t.value}</td>
              </tr>
            ))}
          </table>
        </div> */}

        <div
          className="flex flex-row space-x-3 justify-center pb-10 pt-2"
          style={{ marginTop: '10px' }}
        >
          <img className="w-[100px]" src={lolcLogo} alt="powered by logo" />
          {/* <img className="w-[40px]" src={spiritLogo} alt="powered by logo" /> */}
        </div>
        {/* <div className="italic text-gray-600">Powered By</div> */}

        <footer className="w-full flex flex-col bg-slate-100 rounded-t-xl mt-5">
          <div className="flex flex-row justify-center space-x-3 md:mx-[157px] p-4">
            <div className="flex flex-col justify-between">
              <div
                aria-current="page"
                style={{ fontSize: '0.875rem' }}
                className="text-gray-500 text-sm"
              >
                EventUp 2023 © All rights reserved
              </div>
            </div>
          </div>
        </footer>

        {/* <a href="https://eventup.lk/" className="flex justify-center">
          <img src={eventuplogo} className="h-[50px]" alt="eventup"></img>
        </a>
        <div className="text-xs text-gray-800" style={{marginBottom: '40px'}}>Level up your event</div>
        </a> */}
        {/* <div className="text-xs text-gray-800">Level up your event</div> */}
        {/* <a href="https://eventup.lk/">https://eventup.lk/</a> */}
      </div>
    </div>
  );
};
