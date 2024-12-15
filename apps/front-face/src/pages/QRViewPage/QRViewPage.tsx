import { FunctionComponent } from 'react';
import { QRViewContainer } from '../../containers/QRView/QRView.container';

interface QRViewPageProps {}

const QRViewPage: FunctionComponent<QRViewPageProps> = () => {
  return (
    <div>
      <QRViewContainer />
    </div>
  );
};

export default QRViewPage;
