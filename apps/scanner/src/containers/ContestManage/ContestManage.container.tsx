import {
  subscribeToTotalCheckInCount,
  subscribeToVotingStatus,
  toggleVotingStatus,
} from '@eventup-web/shared';
import { Container, Switch } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRootContext } from '../../app/RootContext';

interface ContestManageContainerProps {}

const ContestManageContainer: FunctionComponent<
  ContestManageContainerProps
> = () => {
  // const [acceptVoting, setacceptVoting] = useState(false);
  const [totalCheckInCount, settotalCheckInCount] = useState(0);
  // const { showMessage } = useRootContext();

  useEffect(() => {
    // const unsubcribe = subscribeToVotingStatus((status) => {
    //   setacceptVoting(status);
    // });

    const unsubTotalCheckIns = subscribeToTotalCheckInCount((totalCheckIns) => {
      settotalCheckInCount(totalCheckIns);
    });

    return () => {
      // unsubcribe();
      unsubTotalCheckIns();
    };
  }, []);

  // const handleAcceptVoting = (e: any, checked: boolean) => {
  //   setacceptVoting(checked);
  //   toggleVotingStatus(checked)
  //     .then(() => {
  //       if (checked) showMessage('SUCCESS', 'Voting Started! ');
  //       else showMessage('SUCCESS', 'Voting Stopped! ');
  //     })
  //     .catch((error) => {
  //       showMessage('ERROR', error.message);
  //     });
  // };

  return (
    <div>
      <Container>
        {/* <div className="text-1xl font-bold">Manage Contest</div>
        Accept Voting{' '}
        <Switch onChange={handleAcceptVoting} checked={acceptVoting}></Switch> */}
        <div className="text-1xl font-bold">Total CheckIns :</div>
        <div className="text-3xl">{totalCheckInCount}</div>
      </Container>
    </div>
  );
};

export default ContestManageContainer;
