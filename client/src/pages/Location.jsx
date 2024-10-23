// src/Demo.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserMap from './UserMap';

const SOCKET_URL = 'http://localhost:8804'; // Adjust if necessary

const Location = () => {
  const [adminPosition, setAdminPosition] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [socket] = useState(() => io(SOCKET_URL));

  useEffect(() => {
    socket.on('adminLocation', (location) => {
      console.log('Admin location received:', location);
      setAdminPosition(location); // Update the map with the admin location
      console.log('adminPosition state:', adminPosition);

    });
  
    return () => {
      socket.disconnect();
    };
  }, [socket, adminPosition]);

  const startTracking = () => {
    setIsTracking(true);

    navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        socket.emit('updateLocation', location); // Emit the updated location to the server
        setAdminPosition(location); // Update the position for the map
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  };

  const stopTracking = () => {
    setIsTracking(false);
    socket.emit('stopTracking'); // Notify the server to stop tracking
    setAdminPosition(null); // Clear the position in the map component
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
        {/* Map for users and admin tracking */}
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '600px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', color: '#333' }}>Bus Tracker</h3>
          <button onClick={isTracking ? stopTracking : startTracking} style={{ padding: '10px', margin: '10px auto', display: 'block' }}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </button>
          <UserMap adminPosition={adminPosition} /> {/* Display admin's position on the map */}
          <p style={{ textAlign: 'center', color: '#555' }}>
            {adminPosition ? 'Tracking bus location.' : 'Bus currently not in service.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Location;
