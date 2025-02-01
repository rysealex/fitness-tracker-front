import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../styles/index.css'
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  return (
    <div className='welcome-container'>
      <h1>Welcome</h1>
      <h2>Fitness Tracker</h2>
      <Stack className='button-container' spacing={2} direction="row" >
        <Button 
          className='log-in' 
          variant="contained" 
          onClick={() => handleNavigate("/login")}
        >
          Login
        </Button>
        <Button 
          className='create-account' 
          variant="contained" 
          onClick={() => handleNavigate("/create-account")}
        >
          Create Account
        </Button>
      </Stack>
    </div>
  );
};

export default Welcome;