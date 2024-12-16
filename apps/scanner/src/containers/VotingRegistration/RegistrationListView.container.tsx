import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Box,
  Divider,
  Stack,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  Add as AddIcon,
  KingBed,
  Female,
  AddCircleOutline,
  CloseRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../components/InfoCard/InfoCard';
import { set } from 'firebase/database';
import { create } from 'domain';
import { RegistrationCreateView } from './RegistrationCreateView.container';
import { getAllContestants } from '@eventup-web/shared';
import { useRootContext } from '../../app/RootContext';
import { Contestant } from '@eventup-web/eventup-models';

// Default Contestant Data
const initialKings = [
  { id: '001', name: 'John Smith' },
  { id: '002', name: 'Mike Johnson' },
  { id: '003', name: 'David Wilson' },
];

const initialQueens = [
  { id: '004', name: 'Emma Davis' },
  { id: '005', name: 'Sarah Wilson' },
  { id: '006', name: 'Lisa Brown' },
];

export function VotingRegistrationListView() {
  const [queens, setQueens] = useState<Contestant[]>([]);
  const { showMessage } = useRootContext();
  const [createModal, setcreateModal] = useState({ visible: false });
  const [reFetch, setreFetch] = useState(0);
  const navigate = useNavigate();

  const handleAddQueen = () => {
    setcreateModal({ visible: true });
  };

  const reFetchData = () => {
    setreFetch((prev) => prev + 1);
  };

  useEffect(() => {
    getAllContestants()
      .then((data) => {
        const queens = data.filter(
          (contestant) => contestant.category === 'QUEEN'
        );
        setQueens(queens);
      })
      .catch((error) => {
        console.log(error);
        showMessage('ERROR', error.message);
      });
  }, [reFetch]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        my: 2,
        px: 1,
        pb: 8,
      }}
    >
      <Fab className="" onClick={handleAddQueen} variant="extended">
        <AddIcon /> Add Queen
      </Fab>
      {/* King Category */}
      {/* <Card sx={{ mb: 2, flex: 1 }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6" fontWeight="medium">
              King Category
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {kings.length} Contestants
            </Typography>
          </Stack>
          <Divider />
          <List sx={{ maxHeight: '100%', overflow: 'auto', flex: 1 }}>
            {kings.map((king) => (
              <ListItem key={king.id}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <KingBed />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={king.name} secondary={`#${king.id}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card> */}

      {/* Queen Category */}
      <Card sx={{ mb: 2, flex: 1 }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6" fontWeight="medium">
              Queen Category
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {queens.length} Contestants
            </Typography>
          </Stack>
          <Divider />
          <List sx={{ maxHeight: '100%', overflow: 'auto', flex: 1 }}>
            {queens.map((queen) => (
              <ListItem key={queen.id}>
                <ListItemAvatar>
                  <Avatar
                    src={queen.photoUrl}
                    sx={{ bgcolor: 'secondary.main' }}
                  >
                    <Female />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={queen.name} secondary={`#${queen.id}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Add Buttons */}

      {/* Add Modal */}

      <Dialog
        open={createModal.visible}
        onClose={() => {
          setcreateModal({ visible: false });
        }}
        style={{ width: '100%' }}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Contestant</DialogTitle>
        <DialogContent>
          <RegistrationCreateView
            selfClose={() => {
              setcreateModal({ visible: false });
            }}
            reFetchParentData={reFetchData}
            reservedId={String(queens.length + 1)}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button
            endIcon={<CloseRounded />}
            onClick={() => setcreateModal({ visible: false })}
            autoFocus
          >
            Close
          </Button>
          <Button
            variant="contained"
            endIcon={<AddCircleOutline />}
            // onClick={handleSubmit}
            disabled={false}
            autoFocus
          >
            Check In
          </Button>
        </DialogActions> */}
      </Dialog>
    </Container>
  );
}
