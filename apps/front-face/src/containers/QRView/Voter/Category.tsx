import { Contestant } from '@eventup-web/eventup-models';
import { FunctionComponent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface ContestantCategoryContainerProps {
  contestants: Contestant[];
  onVote: (contestant: Contestant) => void;
}

export const ContestantCategoryContainer: FunctionComponent<
  ContestantCategoryContainerProps
> = ({ contestants, onVote }) => {
  return (
    <div>
      {contestants.map((contestant) => (
        <div
          key={contestant.id}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4"
        >
          <img
            className="w-full"
            src={contestant.photoUrl}
            alt={contestant.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{contestant.name}</div>
            <button
              onClick={() => onVote(contestant)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
