import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// QR-VIEW
//  Display -> Check-in Display |  Voting Display

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
