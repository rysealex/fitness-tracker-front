import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  return (
    <>
      <h1>Welcome</h1>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => handleNavigate("/login")}>Login</Button>
        <Button variant="contained" onClick={() => handleNavigate("/create-account")}>Create Account</Button>
      </Stack>
    </>
  );
};

export default Welcome;