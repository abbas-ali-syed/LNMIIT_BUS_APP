import { Route, Routes } from "react-router-dom";
import QrPage from "./pages/QrPage";
import CountPage from "./pages/countPage";
import Navbar from "./pages/Navbar";
//import UserProvider from "./UserContext";
import QrScanPage from "./pages/QrScanPage";
import Bus from "./pages/Bus";
import Demo from "./pages/Demo";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from 'react';
import Contact from "./pages/Contact";
import Schedule from "./pages/Schedule";
import { useNavigate } from 'react-router-dom'
import SignUp from "./pages/SignUp";
//import Location from "./pages/Location";
import Cards from "./pages/Cards";
import DailyDiscussion from "./pages/DailyDiscussion";
function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && window.location.pathname !== '/signup') {
      setIsAuthenticated(false);
    } else if (window.location.pathname === '/signup') {
      setIsAuthenticated(null); // or some other value to indicate that authentication is not required
    }
  }, [navigate]);

  return (
    <>
   
         
        <div className="App">
        {window.location.pathname !== '/login' && window.location.pathname !== '/signup' && (
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        )}
          <Routes>
           
            <Route path="/" element={<Home />} />
           
            <Route
            path="/home"
            element={<Home />} 
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/location" element={<Location />} />
          <Route path="/schedule/bus/:id" element={<Bus />} />
          <Route path="/daily-discussion" element={<DailyDiscussion />} />
            <Route path="/qrpage/:rollNo" element={<QrPage />} />
            <Route path="/countPage" element={<CountPage />} />
            <Route path="/scannedPage" element={<QrScanPage />} />
            <Route path="/bus/:id" element={<Bus />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </div>
     
    </>
  );
}

export default App;
