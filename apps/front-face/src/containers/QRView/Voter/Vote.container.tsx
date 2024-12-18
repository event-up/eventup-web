import { Contestant, Participant } from '@eventup-web/eventup-models';
import {
  getAllContestants,
  incrementContestantVote,
  searchParticipantByRefId,
  voteContestant,
} from '@eventup-web/shared';
import { FunctionComponent, useEffect, useState } from 'react';
import { ContestantCategoryContainer } from './Category';
import { useLocation } from 'react-router-dom';
import { useRootContext } from '../../../app/RootContext';
import coverImg from '../../../assets/background_auracle.jpg';
import eventLogo from '../../../assets/event_logo.png';
import { Info, InfoRounded } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface VoteContainerProps {}
const initContestants: { [key: string]: ContestantState[] } = {
  QUEEN: [
    {
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F1?alt=media&token=95c96a20-c6b0-42d3-859b-19b7d00f8a3a',
      voteCount: 0,
      name: 'Sahan',
      votes: 5,
      category: 'QUEEN',
      id: '1',
      voted: true,
    },
    {
      name: 'Seniya',
      id: '2',
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F2?alt=media&token=d6121d15-d325-43b1-bb35-989a39a6653e',
      category: 'QUEEN',
      votes: 4,
      voteCount: 0,
      voted: true,
    },
    {
      id: '3',
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F3?alt=media&token=7968d9e8-f575-4004-af41-4dec234a5b01',
      votes: 4,
      category: 'QUEEN',
      voteCount: 0,
      name: 'UI TEAM',
      voted: true,
    },
    {
      id: '4',
      name: 'TEST3',
      voteCount: 0,
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F4?alt=media&token=11bb12ca-1650-4798-be2f-1d323562ae36',
      category: 'QUEEN',
      votes: 1,
      voted: false,
    },
    {
      id: '5',
      name: 'overflow 3',
      voteCount: 0,
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/party-qr-kiddies.appspot.com/o/contestants%2Fimages%2F4?alt=media&token=11bb12ca-1650-4798-be2f-1d323562ae36',
      category: 'QUEEN',
      votes: 1,
      voted: false,
    },
  ],
};

export type ContestantState = Contestant & { voted: boolean };
const VoteContainer: FunctionComponent<VoteContainerProps> = () => {
  const [contestants, setContestants] = useState<{
    [key: string]: ContestantState[];
  }>(initContestants);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { showMessage } = useRootContext();
  const [reFetechData, setreFetechData] = useState(0);
  const participantRefId = query.get('refid');

  const isVoted = (contestant: Contestant, participant: Participant) => {
    for (const vote of participant.votes) {
      if (vote.contestantId === contestant.id) {
        return true;
      }
    }
    return false;
  };
  console.log({ contestants });

  // useEffect(() => {
  //   const loadParticipant = async () => {
  //     if (participantRefId === null) throw new Error('Invalid Participant Id');

  //     const participant = await searchParticipantByRefId(participantRefId);
  //     setParticipant(participant);
  //   };

  //   loadParticipant().catch((e) => {
  //     showMessage('ERROR', e.message);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [participantRefId, reFetechData]);

  // useEffect(() => {
  //   const loadContestants = async () => {
  //     if (participant === null) return;
  //     if (participantRefId === null) throw new Error('Invalid Participant Id');

  //     const contestants = await getAllContestants();
  //     const contestantsMap = new Map<string, ContestantState[]>();

  //     contestants
  //       .map((c) => {
  //         return { ...c, voted: isVoted(c, participant) };
  //       })
  //       .forEach((contestant) => {
  //         if (contestantsMap.has(contestant.category)) {
  //           contestantsMap.get(contestant.category)?.push(contestant);
  //         } else {
  //           contestantsMap.set(contestant.category, [contestant]);
  //         }
  //       });

  //     setContestants(Object.fromEntries(contestantsMap));
  //   };

  //   loadContestants().catch((e) => {
  //     showMessage('ERROR', e.message);
  //   });
  // }, [participant]);

  const handleOnVote = async (contestant: Contestant) => {
    try {
      if (!participantRefId) {
        showMessage('ERROR', 'Invalid Participant Id');
        return;
      }

      const res = await voteContestant(contestant.id, participantRefId);
      setreFetechData((prev) => prev + 1);
    } catch (e: any) {
      console.log(e);
      showMessage('ERROR', e.message);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        minHeight: '660px',
        // maxWidth: '690px',
        backgroundImage: `url(${coverImg})`,
      }}
      className="pt-2 font-[CinzelDecorative] flex flex-col justify-between items-center   bg-cover text-white "
    >
      <img
        height={200}
        src={eventLogo}
        alt="Event Logo"
        className="mb-8 px-8"
      />

      <div className="text-center bg-black bg-opacity-50 p-2 rounded-lg">
        <div>
          <InfoRounded /> You can vote up to 3 contestants.
        </div>
        <div>
          <InfoRounded /> Casted votes can not be undone
        </div>
      </div>
      <div className="h-[100px]"></div>
      {Object.keys(contestants || {}).map((category) => (
        <ContestantCategoryContainer
          contestants={contestants[category]}
          onVote={handleOnVote}
        />
      ))}
    </div>
  );
};

export default VoteContainer;
