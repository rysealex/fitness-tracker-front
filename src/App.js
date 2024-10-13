import './App.css';
import React, { useState } from 'react';

function App() {
  const [userData, setUserData] = useState({
    uname: '',
    fname: '',
    lname: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
    birthday: ''
  });
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createUser = (e) => {
    e.preventDefault(); // Prevent default form submission
    postData(userData.uname, userData);
  };

  const postData = async (username, userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/user/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app'>
      <h1>Fitness Tracker</h1>
      <h2>Create Account</h2>

      <form onSubmit={createUser}>
        <label htmlFor="uname">Username:</label><br/>
        <input type="text" id="uname" name="uname" value={userData.uname} onChange={handleChange} /><br/>
        
        <label htmlFor="fname">First name:</label><br/>
        <input type="text" id="fname" name="fname" value={userData.fname} onChange={handleChange} /><br/>
        
        <label htmlFor="lname">Last name:</label><br/>
        <input type="text" id="lname" name="lname" value={userData.lname} onChange={handleChange} /><br/>
        
        <label htmlFor="height">Height:</label><br/>
        <input type="text" id="height" name="height" value={userData.height} onChange={handleChange} /><br/>
        
        <label htmlFor="weight">Weight:</label><br/>
        <input type="text" id="weight" name="weight" value={userData.weight} onChange={handleChange} /><br/>
        
        <label htmlFor="age">Age:</label><br/>
        <input type="text" id="age" name="age" value={userData.age} onChange={handleChange} /><br/>
        
        <label htmlFor="gender">Gender:</label><br/>
        <input type="text" id="gender" name="gender" value={userData.gender} onChange={handleChange} /><br/>
        
        <label htmlFor="birthday">Birthday:</label><br/>
        <input type="text" id="birthday" name="birthday" value={userData.birthday} onChange={handleChange} /><br/>
        
        <button type="submit">Create</button>
      </form>
      
      <div>Data: {responseData ? JSON.stringify(responseData) : 'No data received'}</div>
      <div>Error: {error}</div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
