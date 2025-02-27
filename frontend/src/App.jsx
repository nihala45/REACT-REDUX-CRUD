import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home/Home'
import UserProfile from './pages/UserProfile/UserProfile';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminHome from './pages/AdminHome/AdminHome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />

        




      </Routes>
    </Router>
  );
};

export default App;