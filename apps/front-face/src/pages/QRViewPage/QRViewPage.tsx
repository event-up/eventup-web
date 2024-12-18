import { FunctionComponent } from 'react';
import { QRViewAuracle } from '../../containers/QRView/QRView.auracle';

interface QRViewPageProps {}

const QRViewPage: FunctionComponent<QRViewPageProps> = () => {
  return (
    <div className="bg-black  ">
      {/* <QRViewContainer /> */}
      <QRViewAuracle />
    </div>
  );
};

export default QRViewPage;
