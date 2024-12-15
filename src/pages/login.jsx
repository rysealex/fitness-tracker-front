import React, { useState } from 'react';
import { useUser } from '../userContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  const { username, setUsername } = useUser();
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // Event handlers to update state variables
  const handleSubmit = (event) => {
    setUsernameError(false); // reset usernameError
    axios.get(`http://127.0.0.1:5000/user/${username}`)
      .then(function (response) {
        console.log(response.data);
        // check if password is incorrect
        if (password !== response.data) {
          setPasswordError(true); // flip passwordError
        }
        else {
          handleNavigate('/home');
        }

      })
      .catch(function (error) {
        console.log(error.response.data.message);
        // username not found
        setUsernameError(true); // flip usernameError
      });
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
          <TextField
            error={usernameError}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            helperText={usernameError && "Username does not exist"}
            onChange={handleUsernameChange}
          />
          <TextField
            error={passwordError}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            helperText={passwordError && "Incorrect password"}
            onChange={handlePasswordChange}
          />

          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleSubmit()}>Login</Button>
            <Button variant="contained" onClick={() => handleNavigate("/")}>Back</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Login;