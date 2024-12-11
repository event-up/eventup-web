import { useLocation } from 'react-router-dom';
import styles from './QRView.container.module.scss';
import { Participant } from '@eventup-web/eventup-models';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fs } from '../../app/app';

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

export function QRViewContainer() {
  const { search } = useLocation();
  const [participant, setparticipant] = useState<Participant>();
  const query = new URLSearchParams(search);
  const refId = query.get('refid');

  useEffect(() => {
    if (!refId) return;

    const docRef = doc(fs, 'participants', refId?.toString());
    getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        console.log('Document data:', snap.data());
        setparticipant(snap.data() as any);
        // setImgUrl(snap.data().qrUrl);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
        alert("Can't find the QR Code , Please contact Admin");
      }
    });
  }, [refId]);

  console.log({ participant });
  return (
    <div className={styles['container']}>
      <div
        style={{
          // justifyContent: "center",
          width: '100%',
          // verticalAlign: "middle",
          // alignContent: "center",
          // alignItems: "center",
        }}
        className="flex flex-col pb-4 "
      >
        <div
          //   style={{ backgroundImage: `url(${coverImg})` }}
          className="flex-none object-top max-h-[400px] h-2/5  align-middle bg-cover bg-slate-400 bg-bottom "
        >
          {/* <p className="text-3xl font-bold py-4 text-center">
          LOLC Miracle Fest 2023
        </p>
        <div className=" flex align-middle justify-center">
          <table className=" ">
            {eventTable.map((t) => (
              <tr>
                <td className="font-semibold pr-5 ">{t.title}</td>
                <td className="">{t.value}</td>
              </tr>
            ))}
          </table>
        </div> */}

          {/* <div className="text-center flex justify-center flex-col">
          <div className="text-xs italic">Powered by</div>
          <div className="flex flex-row justify-center space-x-4">
            <img className="w-[40px]" src={lolcLogo} alt="powered by logo" />
            <img className="w-[40px]" src={spiritLogo} alt="powered by logo" />
          </div>
        </div> */}
          <div className="pt-[50px] flex justify-center">
            <div
              style={{
                fontFamily: 'PWHappyChristmas',
                fontSize: '40px',
                lineHeight: 1,
                textAlign: 'center',
              }}
              className=""
            >
              <span className="text-[#004ea0]">Kids Winter</span>
              <br></br>
              <span className="text-[#d40004] ">Wonderland</span> 2023
            </div>
          </div>
        </div>
        <div className="align-center relative flex flex-col justify-center">
          <div className="flex-1  absolute border  rounded-lg shadow-lg  ">
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
            <span className="font-semibold">Kids Winter Wonderland 2023.</span>{' '}
            Please present this at the entrance.
          </div>

          <div className="pt-3">
            9th December, 3.00pm Onwards @ Excel World.
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
            {/* <img className="w-[40px]" src={lolcLogo} alt="powered by logo" />
            <img className="w-[40px]" src={spiritLogo} alt="powered by logo" /> */}
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
    </div>
  );
}
