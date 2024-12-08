import { Route, Link, Routes } from 'react-router-dom';

import styles from './CheckerPage.module.scss';
import CheckerPageRoutes from './CheckerPage.routes';

export function ScannerPage() {
  return (
    <div className={styles['container']}>
      <CheckerPageRoutes />
    </div>
  );
}

export default ScannerPage;
