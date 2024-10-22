import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const UserMap = ({ position, adminPosition }) => {
  const center = position || adminPosition;

  // Define custom markers
  const redMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const blueMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div style={{ height: '400px' }}>
      {center ? (
        <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {adminPosition && (
            <Marker position={[adminPosition.lat, adminPosition.lng]} icon={blueMarker}>
              <Popup>Admin's Location</Popup> {/* Updated label for admin */}
            </Marker>
          )}
          {position && (
            <Marker position={[position.lat, position.lng]} icon={redMarker}>
              <Popup>User's Location</Popup> {/* Updated label for user */}
            </Marker>
          )}
        </MapContainer>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>Waiting for location...</div>
      )}
    </div>
  );
};

export default UserMap;
