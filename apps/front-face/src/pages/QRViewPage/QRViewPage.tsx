import { FunctionComponent } from 'react';
import { QRViewContainer } from '../../containers/QRView/QRView.container';
import { QRViewAuracle } from '../../containers/QRView/QRView.auracle';

interface QRViewPageProps {}

const QRViewPage: FunctionComponent<QRViewPageProps> = () => {
  return (
    <div>
      {/* <QRViewContainer /> */}
      <QRViewAuracle />
    </div>
  );
};

export default QRViewPage;
