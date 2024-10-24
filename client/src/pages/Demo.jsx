import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Admin from './Admin';
import UserMap from './UserMap';
import { BASE_URL } from '../config';  // Assuming you have the config.js file
const SOCKET_URL = 'https://lnmiit-bus-app.onrender.com'; // Ensure this is your correct socket URL

const Demo = () => {
  const [adminPosition, setAdminPosition] = useState(null);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false); // Flag to ensure socket is ready
  const socket = useRef(null); // Use ref to persist socket

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socket.current.on('connect', () => {
      console.log('Socket connected:', socket.current.id);
      setIsSocketInitialized(true); // Mark socket as initialized
    });

    socket.current.on('connect_error', (err) => {
      console.error('Connection failed:', err);
      setIsSocketInitialized(false);
    });

    // Listen for admin location updates
    socket.current.on('adminLocation', (location) => {
      console.log('Admin location received:', location);
      if (location && location.lat && location.lng) {
        setAdminPosition(location); // Update admin position
        localStorage.setItem('adminLocation', JSON.stringify(location)); // Store in local storage
      } else {
        setAdminPosition(null); // Clear the location if tracking stops
      }
    });

    // Load stored location from localStorage
    const storedLocation = localStorage.getItem('adminLocation');
    if (storedLocation) {
      setAdminPosition(JSON.parse(storedLocation));
    }

    // Cleanup socket on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  if (!isSocketInitialized) {
    return <p>Initializing socket...</p>; // Render something until socket is ready
  }

  return (
    <div>
      <div className="py-24" style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '600px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', color: '#333' }}>Bus Tracker</h3>
          <Admin setPosition={setAdminPosition} socket={socket.current} />
          <UserMap adminPosition={adminPosition} />
          <p style={{ textAlign: 'center', color: '#555' }}>
            {adminPosition ? 'Tracking bus location.' : 'Bus currently not in service.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
