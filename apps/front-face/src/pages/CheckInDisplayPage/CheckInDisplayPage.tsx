import { FunctionComponent } from 'react';
import { CheckInDisplayContainer } from '../../containers/CheckInDisplay/CheckInDisplay.container';

interface CheckInDisplayPageProps {}

const CheckInDisplayPage: FunctionComponent<CheckInDisplayPageProps> = () => {
  return (
    <div>
      <CheckInDisplayContainer />
    </div>
  );
};

export default CheckInDisplayPage;
