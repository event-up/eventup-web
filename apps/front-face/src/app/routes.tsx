import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckInDisplayPage from '../pages/CheckInDisplayPage/CheckInDisplayPage';
import QRViewPage from '../pages/QRViewPage/QRViewPage';
import { VotingRegistrationListView } from '../../../scanner/src/containers/VotingRegistration/RegistrationListView.container';

export const RootRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/checker-display/" element={<CheckInDisplayPage />}></Route>
      <Route path="/participant" element={<QRViewPage />}></Route>
      <Route
        path="/voting-registration"
        element={<VotingRegistrationListView />}
      ></Route>
    </Routes>
  );
};
