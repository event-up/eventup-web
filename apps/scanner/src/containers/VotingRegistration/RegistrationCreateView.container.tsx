import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

export function RegistrationCreateView() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const category = location.state?.category;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRegister = async () => {
    if (!name || !image || !category) {
      alert('Please provide name, image, and category.');
      return;
    }

    setLoading(true);

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${uuidv4()}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const db = getDatabase();
      const newId = uuidv4();
      await set(dbRef(db, `contestants/${category}/${newId}`), {
        id: newId,
        name,
        imageUrl,
      });

      alert('Registration successful!');
      setName('');
      setImage(null);
    } catch (error) {
      console.error('Error registering contestant:', error);
      alert('Error registering contestant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 2, px: 1 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Register Contestant
      </Typography>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                capture
                onChange={handleImageChange}
              />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Registering...' : 'Register Now'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
