import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  return (
    <>
      <h1>Login</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} direction="column" width='25ch'>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />

          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleNavigate("/home")}>Login</Button>
            <Button variant="contained" onClick={() => handleNavigate("/")}>Back</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Login;