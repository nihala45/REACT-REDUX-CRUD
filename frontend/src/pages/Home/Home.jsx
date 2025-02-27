import React from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import ColorSchemesExample from '../../components/Navbar/Navbar';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../../constants/token';



const Home = () => {

  
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')

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
