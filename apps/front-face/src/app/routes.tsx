import { FunctionComponent, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { withSuspense } from '@eventup-web/shared';
// import { VotingRegistrationListView } from '';

// const CheckInDisplayPage = lazy(
//   () => import('../pages/CheckInDisplayPage/CheckInDisplayPage')
// );
const QRViewPage = lazy(() => import('../pages/QRViewPage/QRViewPage'));
// const ContestantDisplayContainer = lazy(
//   () => import('../containers/ContestantDisplay/ContestantDisplay.container')
// );
// const VoteContainer = lazy(
//   () => import('../containers/QRView/Voter/Vote.container')
// );
export const RootRoutes: FunctionComponent = () => {
  return (
    <Routes>
      {/* <Route
        path="checker-display"
        element={withSuspense(<CheckInDisplayPage />)}
      ></Route> */}
      <Route path="participant" element={withSuspense(<QRViewPage />)}></Route>
      {/* <Route
        path="participant/vote"
        element={withSuspense(<VoteContainer />)}
      ></Route> */}
      {/* <Route
        path="contestant-display"
        element={withSuspense(<ContestantDisplayContainer />)}
      ></Route> */}
      {/* <Route
        path="/voting-registration"
        element={<VotingRegistrationListView />}
      ></Route> */}
    </Routes>
  );
};
