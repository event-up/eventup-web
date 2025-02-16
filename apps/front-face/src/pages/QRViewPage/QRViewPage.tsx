import { FunctionComponent } from 'react';
import { QRViewAuracle } from '../../containers/QRView/QRView.auracle';
import { QRViewBaurs } from '../../containers/QRView/QRView.baurs';

interface QRViewPageProps {}

const QRViewPage: FunctionComponent<QRViewPageProps> = () => {
  return (
    <div className="bg-black  ">
      {/* <QRViewContainer /> */}
      {/* <QRViewAuracle /> */}
      <QRViewBaurs />
    </div>
  );
};

export default QRViewPage;
