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
  const { username } = useUser();
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/user/${username}/stats`)
      .then(function (response) {
        console.log(response);
        setStats(response.data);
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
        </div>
        <div style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <StatCard
            title="Height"
            value={stats.height}
            unit="feet"
          //icon={<FaFireAlt />}
          />
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
      <Button variant="contained" onClick={() => handleNavigate("/")}>Sign Out</Button>
    </Container>
  )
};

export default Home;