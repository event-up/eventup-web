import { FunctionComponent } from 'react';
import { ContestantDisplayContainer } from '../../containers/ContestantDisplay/ContestantDisplay.container';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
interface ContestantDisplayPageProps {}

export const ContestantDisplayPage: FunctionComponent<
  ContestantDisplayPageProps
> = () => {
  return (
    <div>
      <ContestantDisplayContainer />
    </div>
  );
};
