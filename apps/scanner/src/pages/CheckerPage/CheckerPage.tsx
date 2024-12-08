import { Route, Link, Routes } from 'react-router-dom';

import styles from './CheckerPage.module.scss';
import CheckerPageRoutes from './CheckerPage.routes';

export function ScannerPage() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Checker!</h1>
      <CheckerPageRoutes />
    </div>
  );
}

export default ScannerPage;
