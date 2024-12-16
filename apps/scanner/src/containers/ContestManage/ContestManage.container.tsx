import {
  subscribeToVotingStatus,
  toggleVotingStatus,
} from '@eventup-web/shared';
import { Container, Switch } from '@mui/material';
import { off } from 'firebase/database';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRootContext } from '../../app/RootContext';

interface ContestManageContainerProps {}

const ContestManageContainer: FunctionComponent<
  ContestManageContainerProps
> = () => {
  const [acceptVoting, setacceptVoting] = useState(false);
  const { showMessage } = useRootContext();

  useEffect(() => {
    const unsubcribe = subscribeToVotingStatus((status) => {
      setacceptVoting(status);
    });

    return () => {
      unsubcribe();
    };
  }, []);

  const handleAcceptVoting = (e, checked: boolean) => {
    setacceptVoting(checked);
    toggleVotingStatus(checked)
      .then(() => {
        if (checked) showMessage('SUCCESS', 'Voting Started! ');
        else showMessage('SUCCESS', 'Voting Stopped! ');
      })
      .catch((error) => {
        showMessage('ERROR', error.message);
      });
  };

  return (
    <div>
      <Container>
        <div className="text-2xl font-bold">Manage Contest</div>
        Accept Voting{' '}
        <Switch onChange={handleAcceptVoting} checked={acceptVoting}></Switch>
      </Container>
    </div>
  );
};

export default ContestManageContainer;
