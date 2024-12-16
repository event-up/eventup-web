import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScannerPage from '../pages/CheckerPage/CheckerPage';
import ContestsPage from '../pages/Contests/ContestsPage';

export const RootRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/checker/*" element={<ScannerPage />}></Route>
      <Route path="/contests/*" element={<ContestsPage />}></Route>
    </Routes>
  );
};
