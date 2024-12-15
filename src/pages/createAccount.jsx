import React, { useState } from 'react';
import { useUser } from '../userContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAccount() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  const { username, setUsername } = useUser();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  // Event handlers to update state variables
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };
  const handleSubmit = (event) => {
    // check if passwords do not match
    if (password !== password2) {
      setErrorFlag(true); // flip errorFlag
    }
    else {
      axios.post("http://127.0.0.1:5000/user", {
        username: username,
        password: password
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      handleNavigate("/enter-info");
    }
  };
  return (
    <>
      <h1>Create Account</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} direction="column" width='25ch'>
          <TextField id="outlined-basic" label="Username" variant="outlined" onChange={handleUsernameChange} />
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={handlePasswordChange} />
          <TextField
            error={errorFlag}
            id="outlined-basic"
            label="Re-type Password"
            variant="outlined"
            type="password"
            helperText={errorFlag && "Passwords don't match"}
            onChange={handlePassword2Change} />

          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleSubmit()}>Create</Button>
            <Button variant="contained" onClick={() => handleNavigate("/")}>Back</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default CreateAccount;