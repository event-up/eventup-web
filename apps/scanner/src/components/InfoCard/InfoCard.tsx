import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { FC } from 'react';
import { Tag } from '../Tag/tag';
import { BooleanToYesNo } from '../../helpers/helpers';
interface InfoCardProps {
  name: string;
  email: string;
  refId: string;
  isOk: boolean;
  spouse: boolean;
  children?: React.ReactNode;
  childrenCount: number;
}

const InfoCard: FC<InfoCardProps> = ({
  email,
  name,
  refId,
  isOk,
  children,
  spouse,
  childrenCount,
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        {isOk && <div>✅ Checked In</div>}

        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {refId}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 0.2 }}>{email}</Typography>
        <Typography sx={{ mb: 0.2 }}>
          Spouse attending:{' '}
          <Tag type={BooleanToYesNo(spouse)}> {BooleanToYesNo(spouse)}</Tag>
        </Typography>
        <Typography sx={{ mb: 0.2 }}>
          Kids Count: <Tag type="No">{childrenCount}</Tag>
        </Typography>
        <CardActions>{children}</CardActions>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
