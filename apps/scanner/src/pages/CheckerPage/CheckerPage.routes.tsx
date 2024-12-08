import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

interface CheckerPageRoutesProps {}

const CheckerPageRoutes: FunctionComponent<CheckerPageRoutesProps> = () => {
  return (
    <Routes>
      <Route
        path="/scanner"
        element={<div>This is the ScannerPage root route.</div>}
      />
      <Route
        path="/contact"
        element={<div>This is the contact root route.</div>}
      />
      <Route
        path="/reference"
        element={<div>This is the reference root route.</div>}
      />
    </Routes>
  );
};

export default CheckerPageRoutes;
