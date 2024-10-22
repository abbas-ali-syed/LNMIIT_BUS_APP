import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Admin from './Admin';
import UserMap from './UserMap';

const SOCKET_URL = 'http://localhost:8804'; // Adjust if necessary

const Demo = () => {
  const [positionCard1, setPositionCard1] = useState(null);
  const [adminPositionCard1, setAdminPositionCard1] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    // Listen for the admin location updates
    socket.on('adminLocation', (location) => {
      setAdminPositionCard1(location); // Update admin position
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
        {/* Card 1 */}
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '600px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', color: '#333' }}>Card 1</h3>
          <Admin setPosition={setPositionCard1} /> {/* Pass setPosition to Admin */}
          <UserMap position={positionCard1} adminPosition={adminPositionCard1} /> {/* Pass adminPosition to UserMap */}
          <p style={{ textAlign: 'center', color: '#555' }}>This card tracks location with a red marker.</p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
