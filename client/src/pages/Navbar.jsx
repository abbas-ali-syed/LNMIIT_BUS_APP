import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false); // Close the menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Main Navbar - Only for larger screens */}
      <nav className="hidden md:bg-transparent md:py-2 md:fixed md:w-full md:z-50 md:border-2 md:border-white md:border-opacity-50 md:rounded-lg md:flex md:justify-center md:items-center">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center space-x-4">
            <Link to="/home" className="border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">
              Home
            </Link>
            <Link to="/schedule" className="border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">
              Schedule
            </Link>
            <Link to="/daily-discussion" className="border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">
              Daily Discussion
            </Link>
            <Link to="/contact" className="border-2 border-white py-2 px-4 rounded-full text-gray-400 font-bold hover:text-blue-600 transition duration-300">
              Contact
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="border-2 border-white text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button - Centered */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 pb-2 flex justify-center items-center bg-gray-800">
        {/* Toggling the open and close menu buttons */}
        <button
          onClick={toggleMenu}
          className="bg-blue-600 border-2 border-white text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          {isOpen ? 'Close Menu ☰' : 'Open Menu ☰'}
        </button>

        {/* X Button - Only visible when the menu is open */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="text-red-500 ml-2 bg-transparent border-none text-lg"
          >
            X
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 rounded-lg shadow-lg z-50">
          <div ref={menuRef} className="flex flex-col items-center">
            <Link to="/home" className="border-b border-white py-2 text-gray-400 font-bold hover:text-blue-600 transition duration-300 w-full text-center">Home</Link>
            <Link to="/schedule" className="border-b border-white py-2 text-gray-400 font-bold hover:text-blue-600 transition duration-300 w-full text-center">Schedule</Link>
            <Link to="/daily-discussion" className="border-b border-white py-2 text-gray-400 font-bold hover:text-blue-600 transition duration-300 w-full text-center">Daily Discussion</Link>
            <Link to="/contact" className="border-b border-white py-2 text-gray-400 font-bold hover:text-blue-600 transition duration-300 w-full text-center">Contact</Link>
            <button
              onClick={handleLogout}
              className="mt-2 border-2 border-white text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
