import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CheckerPageRoutes from './Contests.routes';
import {
  QrCode2Rounded,
  NumbersRounded,
  PersonalVideoOutlined,
  PortraitOutlined,
  PlayArrow,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tabs = ['contestants', 'management'];

export function ContestsPage() {
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
            key="contestants"
            label="Contestants"
            icon={<PortraitOutlined />}
          />
          <BottomNavigationAction
            key="management"
            label="Manage"
            icon={<PlayArrow />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default ContestsPage;
