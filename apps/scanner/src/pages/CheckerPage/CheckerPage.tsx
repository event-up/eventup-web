import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CheckerPageRoutes from './CheckerPage.routes';
import { QrCode2Rounded, NumbersRounded, Phone } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tabs = ['scanner', 'reference', 'contact'];

export function ScannerPage() {
  const [tabKey, setTabKey] = useState(0);
  const navigate = useNavigate();

  return (
    <div className={' h-[100vh]'}>
      <div className="h-[100px]"></div>
      <CheckerPageRoutes />

      <div style={{ alignSelf: 'flex-start', width: '100vw' }}>
        <BottomNavigation
          style={{ position: 'fixed', bottom: 0, width: '100%' }}
          showLabels
          value={tabKey}
          onChange={(e, value: string) => {
            console.log(value, e);
            setTabKey(Number(value));

            navigate(tabs[Number(value)]);
          }}
        >
          <BottomNavigationAction
            key="scanner"
            label="QR"
            icon={<QrCode2Rounded />}
          />
          <BottomNavigationAction
            key="reference"
            label="Ref Code"
            icon={<NumbersRounded />}
          />
          <BottomNavigationAction
            key="contact"
            label="Phone No"
            icon={<Phone />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default ScannerPage;
