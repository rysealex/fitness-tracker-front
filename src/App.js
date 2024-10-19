import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from "./pages/welcome";
import Login from "./pages/login"
import CreateAccount from "./pages/createAccount"
import Home from "./pages/home"
import EnterInformation from "./pages/enterInformation"
import './App.css';
import React from 'react';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/enter-info" element={<EnterInformation />} />
      </Routes>
    </Router>
  )
};

export default App;
