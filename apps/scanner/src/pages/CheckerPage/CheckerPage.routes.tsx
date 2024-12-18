import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ScannerContainer } from '../../containers/Scanner/Scanner.container';
import { ContactContainer } from '../../containers/Contact/Contact.container';
import { ReferenceContainer } from '../../containers/Reference/Reference.container';

interface CheckerPageRoutesProps {}

const CheckerPageRoutes: FunctionComponent<CheckerPageRoutesProps> = () => {
  return (
    <Routes>
      <Route
        path="/scanner"
        element={<ScannerContainer checkPointCode="MAIN" />}
      />
      <Route path="/contact" element={<ContactContainer checkPoint="MAIN" />} />
      <Route
        path="/reference"
        element={<ReferenceContainer checkPoint="MAIN" />}
      />
    </Routes>
  );
};

export default CheckerPageRoutes;
