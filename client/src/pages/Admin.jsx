import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8804'; // Adjust if necessary

const Admin = ({ setPosition }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const startTracking = () => {
    if (socket) {
      setIsTracking(true);

      navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Emit the updated location to the server
          socket.emit('updateLocation', location); // **Emitting admin location to server**
          setPosition(location); // Update the position for the map
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
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
    setPosition(null);
  };

  return (
    <button onClick={isTracking ? stopTracking : startTracking} style={{ padding: '10px' }}>
      {isTracking ? 'Stop Tracking' : 'Start Tracking'}
    </button>
  );
};

export default Admin;
