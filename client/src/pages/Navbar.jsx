import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); 
  };

  return (
    <nav className="bg-transparent py-2 fixed w-full z-50 border-2 border-white border-opacity-50 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center mx-auto space-x-8">
          <Link to="/home" className=" border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">Home</Link>
          <Link to="/schedule" className="border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">Schedule</Link>
          <Link to="/dailydiscussion" className="border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">Daily Discussion</Link>
          <Link to="/contact" className="border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">Contact</Link>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="border-2 border-white text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
