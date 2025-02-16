import { FunctionComponent } from 'react';

interface InvitationLayoutProps {
  children: React.ReactNode;
}

const InvitationLayout: FunctionComponent<InvitationLayoutProps> = ({
  children,
}) => {
  return <div className=" bg-blue-400">{children}</div>;
};

export default InvitationLayout;
