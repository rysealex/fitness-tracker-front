import React, { useState, useEffect } from 'react';
import { useUser } from '../userContext';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import StatCard from '../statCard';
import CurrentDate from '../currentDate';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };
  const { username, setUsername } = useUser();
  const [stats, setStats] = useState({});
  const [weightInput, setWeightInput] = useState(stats.weight);
  const [heightInput, setHeightInput] = useState(stats.height);
  const [profileVisible, setProfileVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
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
        axios.get(`http://127.0.0.1:5000/user/${username}/stats`)
          .then(function (response) {
            setStats(response.data); // Ensure we have the latest stats
            setEditModeWeight(false);
          })
          .catch(function (error) {
            console.log(error);
          });
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
        axios.get(`http://127.0.0.1:5000/user/${username}/stats`)
          .then(function (response) {
            setStats(response.data); // Ensure we have the latest stats
            setEditModeHeight(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(error => {
        console.log("Error updating height:", error);
      });
  };
  // Error checking weight input value
  const handleWeightInputChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue)) {
      setWeightInput(newValue);
    }
  };
  // Error checking height input value
  const handleHeightInputChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue)) {
      setHeightInput(newValue);
    }
  };
  // handle profile picture upload
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        setProfilePicture(file);
      } else {
        alert("Please select a valid image file.");
      }
    }
  };
  const handleSaveProfilePicture = () => {
    if (profilePicture) {
        const formData = new FormData();
        formData.append('file', profilePicture);

        axios.put(`http://127.0.0.1:5000/user/${username}/profile-pic`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log("Profile picture updated successfully:", response.data);
            const imageUrl = response.data.profile_pic;
            setProfilePicture(imageUrl);  // Update the state with new profile picture URL
            axios.get(`http://127.0.0.1:5000/user/${username}/stats`)
                .then(response => {
                    setStats(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log("Error updating profile picture:", error);
        });
    }
};
  const handleProfilePicClick = () => {
    setProfileVisible(prevVisible => {
      const newVisible = !prevVisible;
      console.log("Profile picture clicked. New profileVisible:", newVisible);
      return newVisible;
    });
  };
  // Fetch user stats
  useEffect(() => {
    if (username) {
      axios.get(`http://127.0.0.1:5000/user/${username}/stats`)
        .then(function (response) {
          console.log(response);
          setStats(response.data);
          setWeightInput(response.data.weight);
          setHeightInput(response.data.height);
          setProfilePicture(response.data.profile_pic);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [username])
  return (
    <div>
      <aside className='profile-collapsable'>
        <div className='profile-image' onClick={handleProfilePicClick}>
          {profilePicture ? (
            <img src={`http://127.0.0.1:5000${profilePicture}`} alt="Profile-pic" />
          ) : (
            <FontAwesomeIcon icon={faUser} size="3x" color="white" />
          )}
        </div>
        <div className='profile-username'>
          <h3>{stats.fname} {stats.lname}</h3>
          <h4>{`${username}`}</h4>
        </div>
        {profileVisible && (
          <div className={`profile-stats ${profileVisible ? 'visible' : ''}`}>
            {console.log("profile stats rednered")}
            <ul>
              <li>{stats.gender}</li>
              <li>{stats.age} yrs</li>
              <li>{stats.weight} lbs</li>
              <li>{stats.height} ft</li>
            </ul>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
              />
              {profilePicture && (
                <div>
                  <img src={profilePicture} alt="Profile-pic-preview" />
                  <Button variant='contained' onClick={handleSaveProfilePicture}>Save</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
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
                onChange={handleWeightInputChange}
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
                onChange={handleHeightInputChange}
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
    </div>
  )
};

export default Home;