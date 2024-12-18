import { Contestant } from '@eventup-web/eventup-models';
import {
  getAllContestants,
  subscribeToAllVoteCountUpdates,
} from '@eventup-web/shared';
import { Avatar } from '@mui/material';
import { set } from 'firebase/database';
import { FunctionComponent, Suspense, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface ContestantDisplayContainerProps {}

const InitialContestants = [
  {
    category: 'QUEEN',
    voteCount: 0,
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F1?alt=media&token=95c96a20-c6b0-42d3-859b-19b7d00f8a3a',
    name: 'Sahan',
    votes: 3,
    id: '1',
  },
  {
    id: '2',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F2?alt=media&token=d6121d15-d325-43b1-bb35-989a39a6653e',
    votes: 2,
    name: 'Seniya',
    voteCount: 0,
    category: 'QUEEN',
  },
  {
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F3?alt=media&token=7968d9e8-f575-4004-af41-4dec234a5b01',
    voteCount: 0,
    name: 'UI TEAM',
    category: 'QUEEN',
    votes: 2,
    id: '3',
  },
  {
    id: '4',
    votes: 1,
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F4?alt=media&token=11bb12ca-1650-4798-be2f-1d323562ae36',
    category: 'QUEEN',
    name: 'TEST3',
    voteCount: 0,
  },
];
const ContestantDisplayContainer: FunctionComponent<
  ContestantDisplayContainerProps
> = () => {
  const [contestants, setContestants] =
    useState<Contestant[]>(InitialContestants);
  const [realtimeVotes, setrealtimeVotes] = useState<{ [key: string]: number }>(
    { x: 0 }
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const contestants = await getAllContestants();
  //     console.log('Contestants:', contestants);

  //     setContestants(contestants);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAllVoteCountUpdates((data) => {
      console.log('Vote Stat:', data);
      if (data === null) {
        setrealtimeVotes({});
      } else {
        setrealtimeVotes(data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className=" grid md:grid-cols-4 gap-6 items-center justify-center">
          {contestants.map((contestant) => (
            <ContestantCard contestant={contestant} realtimeVoteCount={50} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

const ContestantCard = ({
  contestant,
  realtimeVoteCount,
}: {
  contestant: Contestant;
  realtimeVoteCount: number;
}) => {
  const [isLoading, setisLoading] = useState(true);
  return (
    <div className="w-[200px] flex flex-col justify-center items-center p-2 shadow-xl rounded-xl">
      <Avatar
        sx={{ width: 250, height: 250 }}
        className="w-full"
        style={{ display: isLoading ? 'none' : 'block' }}
        src={contestant.photoUrl}
        onLoad={() => {
          setisLoading(false);
        }}
        alt={contestant.name}
      />
      <div className="pt-1 text-2xl text-gray-500">#{contestant.id}</div>
      <div className="font-bold text-2xl pb-2">{contestant.name}</div>
      <div className="text-5xl">{realtimeVoteCount}</div>
    </div>
  );
};

export default ContestantDisplayContainer;
