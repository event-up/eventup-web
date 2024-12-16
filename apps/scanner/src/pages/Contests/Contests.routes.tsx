import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { VotingRegistrationListView } from '../../containers/VotingRegistration/RegistrationListView.container';

interface CheckerPageRoutesProps {}

const CheckerPageRoutes: FunctionComponent<CheckerPageRoutesProps> = () => {
  return (
    <Routes>
      <Route path="contestants" element={<VotingRegistrationListView />} />
    </Routes>
  );
};

export default CheckerPageRoutes;
