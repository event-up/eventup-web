import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckInDisplayPage from '../pages/CheckInDisplayPage/CheckInDisplayPage';
import QRViewPage from '../pages/QRViewPage/QRViewPage';

export const RootRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/checker-display/" element={<CheckInDisplayPage />}></Route>
      <Route path="/participant" element={<QRViewPage />}></Route>
    </Routes>
  );
};
