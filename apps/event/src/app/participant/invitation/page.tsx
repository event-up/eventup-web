'use client';
import { FunctionComponent } from 'react';
import { QRView } from './QRView.auracle';

interface InvitationPageProps {}

const InvitationPage: FunctionComponent<InvitationPageProps> = () => {
  return (
    <div className="bg-black  ">
      <QRView />
    </div>
  );
};

export default InvitationPage;
