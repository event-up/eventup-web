import React from 'react';
import { TextField, Button, Container, Box } from '@mui/material';

export const LoginContainer: React.FC = () => {
  return (
    <Container className="flex justify-center items-center h-screen bg-gray-100">
      <Box className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" fullWidth className="mt-4">
          Login
        </Button>
      </Box>
    </Container>
  );
};
