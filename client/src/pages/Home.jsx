
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'
import Schedule from './Schedule'
import LandingPage from './LandingPage'
import Navbar from './Navbar';
import DailyDiscussion from './DailyDiscussion';
import Contact from './Contact';
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
    
      if (!isAuthenticated) {
        return null; // Render nothing if not authenticated
      }

  return (
    <div>
        
        <LandingPage />
        
     
    <span className="text-2xl">{isAuthenticated ? (
        <Schedule />
      ) : (
        <div>Please log in</div>
      )}</span>
      <span className="text-2xl">{isAuthenticated ? (
        <DailyDiscussion />
      ) : (
        <div>Please log in</div>
      )}</span>
      <Contact />
       </div>
  )
 
}

export default Home
