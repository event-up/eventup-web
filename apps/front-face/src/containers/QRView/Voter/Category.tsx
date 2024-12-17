import { Contestant } from '@eventup-web/eventup-models';
import { Avatar, Button, LinearProgress } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { ContestantState } from './Vote.container';
import { Done, PlusOne } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface ContestantCategoryContainerProps {
  contestants: ContestantState[];
  onVote: (contestant: Contestant) => Promise<void>;
}

export const ContestantCategoryContainer: FunctionComponent<
  ContestantCategoryContainerProps
> = ({ contestants, onVote }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 place-items-center p-2">
      {contestants.map((contestant) => (
        <VoteCard contestant={contestant} onVote={onVote} />
      ))}
    </div>
  );
};

interface VoteCardProps {
  contestant: ContestantState;
  onVote: (contestant: Contestant) => Promise<void>;
}

const VoteCard: FunctionComponent<VoteCardProps> = ({ contestant, onVote }) => {
  const [loading, setloading] = useState(false);

  return (
    <div className="p-2 shadow-xl flex flex-col justify-center items-center rounded-xl">
      <Avatar
        sx={{ width: 100, height: 100 }}
        className="w-full"
        src={contestant.photoUrl}
        alt={contestant.name}
      />
      <div className="pt-1 text-gray-500">#{contestant.id}</div>
      <div className="font-bold text-xl pb-2">{contestant.name}</div>
      <Button
        disabled={contestant.voted}
        onClick={() => {
          setloading(true);
          onVote(contestant).finally(() => {
            setloading(false);
          });
        }}
        startIcon={contestant.voted ? <Done /> : <PlusOne />}
      >
        {contestant.voted ? 'Voted' : 'Vote'}
      </Button>
      {loading && (
        <div className="w-full">
          <LinearProgress />
        </div>
      )}
    </div>
  );
};

export default VoteCard;
