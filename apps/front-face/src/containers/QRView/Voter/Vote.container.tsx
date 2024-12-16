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
interface VoteContainerProps {}

export type ContestantState = Contestant & { voted: boolean };
const VoteContainer: FunctionComponent<VoteContainerProps> = () => {
  const [contestants, setContestants] = useState<{
    [key: string]: ContestantState[];
  }>({});
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

  useEffect(() => {
    const loadParticipant = async () => {
      if (participantRefId === null) throw new Error('Invalid Participant Id');

      const participant = await searchParticipantByRefId(participantRefId);
      setParticipant(participant);
    };

    loadParticipant().catch((e) => {
      showMessage('ERROR', e.message);
    });
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
    } catch (e) {
      console.log(e);
      showMessage('ERROR', e.message);
    }
  };

  return (
    <div>
      <div className="h-[100px]"></div>
      {Object.keys(contestants || {}).map((category) => (
        <div key={category}>
          <h1>{category}</h1>
          <ContestantCategoryContainer
            contestants={contestants[category]}
            onVote={handleOnVote}
          />
        </div>
      ))}
    </div>
  );
};

export default VoteContainer;
