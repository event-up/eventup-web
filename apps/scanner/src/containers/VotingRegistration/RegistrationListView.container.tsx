import React, { useState } from 'react';
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
} from '@mui/material';
import { Add as AddIcon, KingBed, Female } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
  const [kings, setKings] = useState(initialKings);
  const [queens, setQueens] = useState(initialQueens);
  const navigate = useNavigate();

  const handleAddKing = () => {
    navigate('register', {
      state: { category: 'king' },
    });
  };

  const handleAddQueen = () => {
    navigate('register', {
      state: { category: 'queen' },
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        my: 2,
        px: 1,
        pb: 8,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* King Category */}
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
      </Card>

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
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
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
      <Box
        sx={{
          p: 1,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddKing}
            color="primary"
            fullWidth
          >
            Add King
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddQueen}
            color="secondary"
            fullWidth
          >
            Add Queen
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
