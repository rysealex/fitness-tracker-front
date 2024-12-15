import React, { useState } from 'react';
import { useUser } from '../userContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InputLabel } from '@mui/material';

function EnterInformation() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  const { username } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  // Event handlers to update state variables
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleSubmit = (event) => {
    axios.post(`http://127.0.0.1:5000/user/${username}/stats`, {
      fname: firstName,
      lname: lastName,
      height: height,
      weight: weight,
      age: age,
      gender: gender
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    handleNavigate("/home");
  };
  return (
    <>
      <h1>Enter Information</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} direction="column" width='25ch'>
          <TextField id="fname" label="First Name" variant="outlined" onChange={handleFirstNameChange} />
          <TextField id="lname" label="Last Name" variant="outlined" onChange={handleLastNameChange} />
          <TextField id="height" label="Height (feet)" variant="outlined" type="number" onChange={handleHeightChange} />
          <TextField id="weight" label="Weight (lbs)" variant="outlined" type="number" onChange={handleWeightChange} />
          <TextField id="age" label="Age" variant="outlined" type="number" onChange={handleAgeChange} />
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select labelId="gender-label" id="gender" label="Gender" onChange={handleGenderChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleSubmit()}>Continue</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default EnterInformation;