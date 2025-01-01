import React, { useState, useEffect } from 'react';
import { useUser } from '../userContext';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import StatCard from '../statCard';
import CurrentDate from '../currentDate';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  const { username, setUsername } = useUser();
  const [stats, setStats] = useState({});
  const [weightInput, setWeightInput] = useState(stats.weight);
  const [heightInput, setHeightInput] = useState(stats.height);
  // Event handler for sign out button
  const handleSignOut = (event) => {
    setUsername("");
    handleNavigate('/');
  };
  // Event handler for edit buttons
  const [editModeWeight, setEditModeWeight] = useState(false);
  const handleClickWeight = () => {
    setEditModeWeight(!editModeWeight);
  };
  const [editModeHeight, setEditModeHeight] = useState(false);
  const handleClickHeight = () => {
    setEditModeHeight(!editModeHeight);
  };
  // Event handler for saving the new values
  const handleSaveWeight = () => {
    const updatedStats = { ...stats, weight: weightInput };
    setStats(updatedStats);
    // Connect to backend here
    axios.put(`http://127.0.0.1:5000/user/${username}/stats`, {
      weight: weightInput
    })
      .then(response => {
        console.log("Weight updated successfully:", response.data);
        setEditModeWeight(false);
      })
      .catch(error => {
        console.log("Error updating weight:", error);
      });
  };
  const handleSaveHeight = () => {
    const updatedStats = { ...stats, height: heightInput };
    setStats(updatedStats);
    // Connect to backend here
    axios.put(`http://127.0.0.1:5000/user/${username}/stats`, {
      height: heightInput
    })
      .then(response => {
        console.log("Height updated successfully:", response.data);
        setEditModeHeight(false);
      })
      .catch(error => {
        console.log("Error updating height:", error);
      });
  };
  // Fetch user stats
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/user/${username}/stats`)
      .then(function (response) {
        console.log(response);
        setStats(response.data);
        setWeightInput(response.data.weight);
        setHeightInput(response.data.height);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [username])
  return (
    <Container>
      {/* Flexbox container for stat cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <StatCard
            title="Username"
            value={`${username}`}
          //unit=""
          //icon={<FaFireAlt />}
          />
        </div>
        <div style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <StatCard
            title="Today's Date"
            value={<CurrentDate />}
          //unit="lbs"
          //icon={<FaWalking />}
          />
        </div>
        <div style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <StatCard
            title="Weight"
            value={stats.weight}
            unit="lbs"
          //icon={<FaWalking />}
          />
          <Button variant="contained" onClick={handleClickWeight}>Edit</Button>
          {editModeWeight && (
            <>
              <input
                type="text"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
              />
              <Button variant='contained' onClick={handleSaveWeight}>Save</Button>
            </>
          )}
        </div>
        <div style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <StatCard
            title="Height"
            value={stats.height}
            unit="feet"
          //icon={<FaFireAlt />}
          />
          <Button variant="contained" onClick={handleClickHeight}>Edit</Button>
          {editModeHeight && (
            <>
              <input
                type="text"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
              />
              <Button variant='contained' onClick={handleSaveHeight}>Save</Button>
            </>
          )}
        </div>
        <div style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <StatCard
            title="Age"
            value={stats.age}
            unit="years"
          //icon={<FaFireAlt />}
          />
        </div>
        <div style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <StatCard
            title="Gender"
            value={stats.gender}
          //unit=""
          //icon={<FaFireAlt />}
          />
        </div>
      </div>
      <Button variant="contained" onClick={() => handleSignOut()}>Sign Out</Button>
    </Container>
  )
};

export default Home;