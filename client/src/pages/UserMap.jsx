import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const UserMap = ({ adminPosition }) => {
  const mapRef = useRef(null); // Keeps the map instance
  const markerRef = useRef(null); // Keeps track of the marker instance

  const blueMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    // Initialize the map once
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Realtime Location Tracker',
      }).addTo(mapRef.current);
    }

    // Handle admin position updates
    if (adminPosition) {
      const { lat, lng } = adminPosition;

      if (markerRef.current) {
        // If marker already exists, update its position
        markerRef.current.setLatLng([lat, lng]);
      } else {
        // If marker doesn't exist, create a new one
        markerRef.current = L.marker([lat, lng], { icon: blueMarker }).addTo(mapRef.current);
        markerRef.current.bindPopup('Admin Location');
      }

      // Set the map view to the updated position
      mapRef.current.setView([lat, lng], 16);

    } else if (markerRef.current) {
      // If adminPosition is null, remove the marker from the map
      mapRef.current.removeLayer(markerRef.current);
      markerRef.current = null; // Clear the marker reference
    }

  }, [adminPosition]); // This effect will run whenever `adminPosition` changes

  return (
    <div id="map" style={{ height: '400px', width: '100%' }} />
  );
};

export default UserMap;
