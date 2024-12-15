import { Contestant } from '@eventup-web/eventup-models';
import {
  getAllContestants,
  incrementContestantVote,
} from '@eventup-web/shared';
import { FunctionComponent, useEffect, useState } from 'react';
import { ContestantCategoryContainer } from './Category';

interface VoteContainerProps {}

const VoteContainer: FunctionComponent<VoteContainerProps> = () => {
  const [contestants, setContestants] = useState<{
    [key: string]: Contestant[];
  }>({});

  useEffect(() => {
    getAllContestants()
      .then((contestants) => {
        const contestantsMap = new Map<string, Contestant[]>();

        contestants.forEach((contestant) => {
          if (contestantsMap.has(contestant.category)) {
            contestantsMap.get(contestant.category)?.push(contestant);
          } else {
            contestantsMap.set(contestant.category, [contestant]);
          }
        });

        setContestants(Object.fromEntries(contestantsMap));
      })
      .catch((error) => {
        // TODO add error message showing
        console.error(error);
      });
  }, []);

  const hanldeOnVote = async (contestant: Contestant) => {
    const res = await incrementContestantVote(contestant.id);
  };

  return (
    <div>
      {Object.keys(contestants || {}).map((category) => (
        <div key={category}>
          <h1>{category}</h1>
          <ContestantCategoryContainer
            contestants={contestants[category]}
            onVote={(contestant) => {
              hanldeOnVote(contestant);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default VoteContainer;
