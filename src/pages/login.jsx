import React, { useState, useEffect } from 'react';
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
  const [usernameNoEntry, setUsernameNoEntry] = useState(false);
  const [passwordNoEntry, setPasswordNoEntry] = useState(false);
  // Reset the username on component unmount
  useEffect(() => {
    return () => {
      setUsername(""); // reset username here
    };
  }, [setUsername]);
  // Event handlers to update state variables
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameNoEntry(false);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordNoEntry(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // reset errors
    setUsernameError(false);
    setPasswordError(false);
    // check if username is empty
    if (username === "") {
      setUsernameNoEntry(true);
    }
    // check if password is empty
    if (password === "") {
      setPasswordNoEntry(true);
    }
    // check if both fields are empty, don't continue
    if (username === "" && password === "") {
      return;
    }
    axios.get(`http://127.0.0.1:5000/user/${username}`)
      .then(function (response) {
        // check if password is incorrect
        if (password !== response.data) {
          setPasswordError(true); // flip passwordError
        }
        else {
          setUsername(username); // set the username in the context
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
      <div className='login-container'>
        <h1>Login</h1>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2} direction="column" width='25ch'>
            <TextField
              className='textfield'
              error={usernameError || usernameNoEntry}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              helperText={usernameError ? "Username does not exist" : (usernameNoEntry && "Enter a Username")}
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              className='textfield'
              error={passwordError || passwordNoEntry}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              helperText={passwordError ? "Incorrect password" : (passwordNoEntry && "Enter a Password")}
              value={password}
              onChange={handlePasswordChange}
            />

            <Stack className='button-container' spacing={2} direction="row">
              <Button variant="contained" type="submit">Login</Button>
              <Button variant="contained" onClick={() => handleNavigate("/")}>Back</Button>
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default Login;