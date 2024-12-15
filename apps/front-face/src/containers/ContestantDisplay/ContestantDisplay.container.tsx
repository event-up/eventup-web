import { Contestant } from '@eventup-web/eventup-models';
import { subscribeToContestantVote } from '@eventup-web/shared';
import { FunctionComponent, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface ContestantDisplayContainerProps {}

const ContestantDisplayContainer: FunctionComponent<
  ContestantDisplayContainerProps
> = () => {
  const [contestants, setContestants] = useState<Contestant[]>([]);

  useEffect(() => {
    // subscribeToContestantVote((contestant) => {})
  }, []);

  return <div>Contestant Display Container</div>;
};

export default ContestantDisplayContainer;
