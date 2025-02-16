import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { VotingRegistrationListView } from '../../containers/VotingRegistration/RegistrationListView.container';
import ContestManageContainer from '../../containers/ContestManage/ContestManage.container';

interface CheckerPageRoutesProps {}

const CheckerPageRoutes: FunctionComponent<CheckerPageRoutesProps> = () => {
  return (
    <Routes>
      {/* <Route path="contestants" element={<VotingRegistrationListView />} /> */}
      <Route path="manage" element={<ContestManageContainer />} />
    </Routes>
  );
};

export default CheckerPageRoutes;
