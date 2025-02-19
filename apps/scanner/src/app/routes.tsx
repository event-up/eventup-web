import { FunctionComponent, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ScannerPage from '../pages/CheckerPage/CheckerPage';
import LoginPage from '../pages/LoginPage/LoginPage';
// import ContestsPage from '../pages/Contests/ContestsPage';
import { Tab, Tabs } from '@mui/material';
import ContestsPage from '../pages/Contests/ContestsPage';

export const RootRoutes: FunctionComponent = () => {
  const nav = useNavigate();
  const [tab, settab] = useState('checker/scanner');

  useEffect(() => {
    nav('checker/scanner');
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-center">
        <Tabs
          value={tab}
          onChange={(e, value) => {
            console.log({ value });
            settab(value);
            nav(value);
          }}
        >
          <Tab value={'checker/scanner'} label="Checker" />
          <Tab value={'event/manage'} label="Event Management" />
        </Tabs>
      </div>
      <Routes>
        <Route path="/checker/*" element={<ScannerPage />}></Route>
        <Route path="/event/*" element={<ContestsPage />}></Route>
      </Routes>
    </div>
  );
};
