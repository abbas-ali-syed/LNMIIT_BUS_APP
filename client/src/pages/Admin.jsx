import React, { useState, useRef } from 'react';

const Admin = ({ setPosition, socket }) => {
  const [isTracking, setIsTracking] = useState(false);
  const watchId = useRef(null);

  const startTracking = () => {
    if (!socket) return;
    setIsTracking(true);

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        socket.emit('updateLocation', location);
        console.log('Tracking location:', location);
        setPosition(location);
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
    socket.emit('stopTracking'); // Notify users
    setPosition(null); // Clear local state
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
    }
  };

  return (
    <button onClick={isTracking ? stopTracking : startTracking}>
      {isTracking ? 'Stop Tracking' : 'Start Tracking'}
    </button>
  );
};

export default Admin;
