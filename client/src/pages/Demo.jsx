import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Admin from './Admin';
import UserMap from './UserMap';
import { BASE_URL } from '../config';
const SOCKET_URL = `${BASE_URL}`; // Adjust if necessary

const Demo = () => {
  const [adminPosition, setAdminPosition] = useState(null);
  const socket = useRef(null); // Socket instance

  useEffect(() => {
    socket.current = io(SOCKET_URL);

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
      socket.current.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="py-24"style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '600px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', color: '#333' }}>Bus Tracker</h3>
          <Admin setPosition={setAdminPosition} socket={socket.current} /> {/* Pass socket down */}
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
