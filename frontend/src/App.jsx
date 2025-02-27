import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home/Home'
import UserProfile from './pages/UserProfile/UserProfile';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminHome from './pages/AdminHome/AdminHome';
import { useDispatch, useSelector } from 'react-redux';
import { ACCESS_TOKEN } from './constants/token';
import UserProtectedRoute from './components/UserProtectedRoute';
import UserLoginRedirect from './components/UserLoginRedirect';
import { logout } from "./redux/actions/authActions";
import NotFound from './pages/NotFound/NotFound';
import { Navigate } from 'react-router-dom';
import AdminLoginRedirect from './components/AdminLoginRedirect';
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}


const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserProtectedRoute element={<Home />}/>}/>
      <Route path='/profile' element={<UserProtectedRoute element={<UserProfile/>}/>}/>
      <Route path='/login' element={<UserLoginRedirect><Login/></UserLoginRedirect>}/>
      <Route path='/logout' element={<logout/>}/>
      <Route path='/register' element={<UserLoginRedirect><RegisterAndLogout/></UserLoginRedirect>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path="/adminlogin"element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/adminhome" />}/>
      <Route path="/adminhome" element={isAuthenticated ? <AdminHome /> : <Navigate to="/adminlogin" />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;