import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { InputLabel } from '@mui/material';

function EnterInformation() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
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
          <TextField id="fname" label="First Name" variant="outlined" />
          <TextField id="lname" label="Last Name" variant="outlined" />
          <TextField id="height" label="Height (feet)" variant="outlined" type="number" />
          <TextField id="weight" label="Weight (lbs)" variant="outlined" type="number" />
          <TextField id="age" label="Age" variant="outlined" type="number" />
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select labelId="gender-label" id="gender" label="Gender"
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleNavigate("/home")}>Continue</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default EnterInformation;