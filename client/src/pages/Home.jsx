
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'
import Schedule from './Schedule'
import LandingPage from './LandingPage'
import Navbar from './Navbar';
const Home = (props) => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        } else {
          navigate('/login');
        }
      }, [navigate]);
    


  return (
    <div>
        
        <LandingPage />
        
     
    <span className="text-2xl">{isAuthenticated ? (
        <Schedule />
      ) : (
        <div>Please log in</div>
      )}</span>
       </div>
  )
 
}

export default Home
