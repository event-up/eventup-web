import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScannerPage from '../pages/CheckerPage/CheckerPage';

export const RootRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/checker/*" element={<ScannerPage />}></Route>
    </Routes>
  );
};
