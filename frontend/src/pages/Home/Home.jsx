import React from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import ColorSchemesExample from '../../components/Navbar/Navbar';
import { logout } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';



const Home = () => {

  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login');
    
  }
 
  
  return (
    <>
    <ColorSchemesExample/>
    

  
    <div className="container1">
      
      <h1 className="title1">Welcome to Our Website</h1>
      <p className='text1'>Thank you for visiting us. Explore and enjoy your stay.</p>
      <button onClick={handleLogout}  className='button1'>Logout</button>
  
    </div>
    </>
  )
}

export default Home;
