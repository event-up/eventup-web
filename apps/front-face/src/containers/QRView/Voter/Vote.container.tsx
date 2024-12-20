import { Contestant, Participant } from '@eventup-web/eventup-models';
import {
  getAllContestants,
  searchParticipantByRefId,
  voteContestant,
} from '@eventup-web/shared';
import { FunctionComponent, useEffect, useState } from 'react';
import { ContestantCategoryContainer } from './Category';
import { useLocation } from 'react-router-dom';
import { useRootContext } from '../../../app/RootContext';
import coverImg from '../../../assets/background_auracle.jpg';
import eventLogo from '../../../assets/event_logo.png';
import { InfoRounded } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface VoteContainerProps {}

export type ContestantState = Contestant & { voted: boolean };
const VoteContainer: FunctionComponent<VoteContainerProps> = () => {
  const [contestants, setContestants] = useState<{
    [key: string]: ContestantState[];
  }>([]);
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

  useEffect(() => {
    const loadParticipant = async () => {
      if (participantRefId === null) throw new Error('Invalid Participant Id');

      const participant = await searchParticipantByRefId(participantRefId);
      setParticipant(participant);
    };

    loadParticipant().catch((e) => {
      showMessage('ERROR', e.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantRefId, reFetechData]);

  useEffect(() => {
    const loadContestants = async () => {
      if (participant === null) return;
      if (participantRefId === null) throw new Error('Invalid Participant Id');

      const contestants = await getAllContestants();
      const contestantsMap = new Map<string, ContestantState[]>();

      contestants
        .map((c) => {
          return { ...c, voted: isVoted(c, participant) };
        })
        .forEach((contestant) => {
          if (contestantsMap.has(contestant.category)) {
            contestantsMap.get(contestant.category)?.push(contestant);
          } else {
            contestantsMap.set(contestant.category, [contestant]);
          }
        });

      setContestants(Object.fromEntries(contestantsMap));
    };

    loadContestants().catch((e) => {
      showMessage('ERROR', e.message);
    });
  }, [participant]);

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
      className="pt-2 font-[CinzelDecorative] flex flex-col justify-start items-center   bg-cover text-white "
    >
      <img
        height={200}
        src={eventLogo}
        alt="Event Logo"
        className="mb-8 px-8"
      />

      <div className=" flex flex-col justify-start text-sm text-center bg-black bg-opacity-50 p-2 rounded-lg">
        <div>
          <InfoRounded /> You can vote up to 3 contestants.
        </div>
        <div className="text-left">
          <InfoRounded /> Casted votes can not be undone
        </div>
      </div>

      {participant &&
        contestants &&
        Object.keys(contestants || {}).map((category) => (
          <ContestantCategoryContainer
            participant={participant}
            contestants={contestants[category]}
            onVote={handleOnVote}
          />
        ))}

      <footer className="fixed bottom-0">
        <a
          href="https://eventup-lk.web.app/"
          target="_blank"
          className="text-[8px]"
          rel="noreferrer"
        >
          <div className="text-[5px]">
            All rights reserved &copy; {new Date().getFullYear()} Eventup.lk
          </div>
        </a>
      </footer>
    </div>
  );
};

export default VoteContainer;
