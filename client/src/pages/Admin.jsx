import React, { useState, useRef, useEffect } from 'react';

const Admin = ({ setPosition, socket }) => {
  const [isTracking, setIsTracking] = useState(false);
  const watchId = useRef(null);
  const isAdmin = localStorage.getItem('role') === 'admin';

  const startTracking = () => {
    if (!socket) {
      console.error('Socket not initialized');
      return;
    }
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
    if (!socket) {
      console.error('Socket not initialized');
      return;
    }
    socket.emit('stopTracking'); // Notify users
    setPosition(null); // Clear local state
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
    }
  };

  if (!isAdmin) {
    return null; // Do not render the button if the user is not an admin
  }

  return (
    <button
      onClick={isTracking ? stopTracking : startTracking}
      className={`px-4 py-2 m-2 font-bold text-white rounded-lg transition-transform ${
        isTracking ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
      } active:scale-95`}
    >
      {isTracking ? 'Stop Tracking' : 'Start Tracking'}
    </button>
  );
};

export default Admin;
