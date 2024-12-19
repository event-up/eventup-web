import { Contestant } from '@eventup-web/eventup-models';
import {
  Avatar,
  Button,
  LinearProgress,
  styled,
  SwipeableDrawer,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { ContestantState } from './Vote.container';
import { ArrowUpward, Done, PlusOne, Upcoming } from '@mui/icons-material';
import grey from '@mui/material/colors/grey';
import { ContestantCard } from './VoteContestantCard';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface ContestantCategoryContainerProps {
  contestants: ContestantState[];
  onVote: (contestant: Contestant) => Promise<void>;
}

export const ContestantCategoryContainer: FunctionComponent<
  ContestantCategoryContainerProps
> = ({ contestants, onVote }) => {
  return (
    <div className="flex flex-wrap justify-evenly   overflow-x-auto">
      {contestants.map((contestant) => (
        <VoteCard key={contestant.id} contestant={contestant} onVote={onVote} />
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
  // Add state for drawer
  const [drawerState, setDrawerState] = useState<{
    bottom: boolean;
  }>({
    bottom: false,
  });

  const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
    ...theme.applyStyles('dark', {
      backgroundColor: grey[900],
    }),
  }));

  // Toggle drawer function
  const toggleDrawer = (open: boolean) => () => {
    setDrawerState({ bottom: open });
  };

  return (
    <>
      {/* <div
        className="shadow-[0_0_15px_rgba(217,119,6,0.15)] hover:shadow-[0_0_25px_rgba(217,119,6,0.25)] 
                    flex flex-col justify-center items-center w-2/5 h-2/5 my-4 mx-2 
                    rounded-3xl bg-yellow-950 bg-opacity-95 flex-shrink-0
                    transition-all duration-300 ease-in-out"
        onClick={toggleDrawer(true)} // Add click handler to open drawer
      > */}
      <ContestantCard onClick={toggleDrawer(true)}>
        <Avatar
          sx={{ width: 70, height: 70 }}
          className="w-full"
          src={contestant.photoUrl}
          alt={contestant.name}
        />
        <div className="pt-1 text-xl  text-eventPrimary">#{contestant.id}</div>
        <div className="font-bold text-[15px]  pb-2 ">{contestant.name}</div>
      </ContestantCard>
      {/* </div> */}
      <SwipeableDrawer
        anchor="bottom"
        open={drawerState.bottom}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={80}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Puller />
        <div className=" flex flex-col justify-center font-[CinzelDecorative] p-4 bg-[#212121] min-h-[00px]">
          {/* Drawer Content */}
          <div className="flex flex-col items-center  mb-4 pt-8">
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={contestant.photoUrl}
              alt={contestant.name}
            />
            <div>
              <div className="text-xl text-eventPrimary font-bold">
                {contestant.name}
              </div>
              <div className="font-sans text-[#FAFAFA] text-3xl text-center">
                #{contestant.id}
              </div>
            </div>
          </div>
          <Button
            disabled={contestant.voted}
            onClick={() => {
              setloading(true);
              onVote(contestant).finally(() => {
                setloading(false);
              });
            }}
            startIcon={contestant.voted ? <Done /> : <ArrowUpward />}
            className="text-"
            sx={{
              borderRadius: '24px',
              padding: '20px',
              fontSize: '15px',
              margin: '10px',
              fontWeight: 'bold',
              fontFamily: 'CinzelDecorative',
              // textTransform: 'none',
              backgroundColor: '#dbad45',
              color: 'black',

              '&:disabled': {
                backgroundColor: '#BDBDBD',
              },
            }}
          >
            {contestant.voted ? 'Voted' : 'Vote for ' + contestant.name}
          </Button>
          {loading && (
            <div className="w-full">
              <LinearProgress />
            </div>
          )}
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default VoteCard;
//relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]
