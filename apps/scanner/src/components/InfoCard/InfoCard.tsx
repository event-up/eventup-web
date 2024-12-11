import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { FC } from 'react';

interface InfoCardProps {
  name: string;
  email: string;
  refId: string;
  isOk: boolean;
  children?: any;
}

const InfoCard: FC<InfoCardProps> = ({
  email,
  name,
  refId,
  isOk,
  children,
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
        <Typography sx={{ mb: 1.5 }}>{email}</Typography>
        <CardActions>{children}</CardActions>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
