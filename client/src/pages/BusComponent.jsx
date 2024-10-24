import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const BusComponent = ({ bus, index, refreshBusData }) => {
  const userRole = localStorage.getItem('role');
  const isAdmin = userRole === "admin";

  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-gray-500",
  ];

  const [status, setStatus] = useState(bus.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      const response = await fetch(`http://localhost:8804/api/users/buses/${bus.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        refreshBusData(); // Call the refresh function after successful update
      }
    } catch (error) {
      console.error('Error updating bus status:', error);
    }
  };

  const colorClass = colors[index % colors.length];

 

  return (
    <div className={`${colorClass} text-white mb-2 mx-4 rounded-lg shadow-lg w-full`}>
      {isAdmin && (
        <div>
          <input type="radio" id="red" name="status" value="Cancelled" onChange={handleStatusChange} />
          <label className="red">Cancelled</label>
          <input type="radio" id="green" name="status" value="On time" onChange={handleStatusChange} />
          <label className="green">On Time</label>
          <input type="radio" id="yellow" name="status" value="Delayed" onChange={handleStatusChange} />
          <label className="yellow">Delayed</label>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold">Bus {bus.id}</h2>
        <div className="font-bold">
          {bus.start} ---- {bus.destination}
          <div>Seats Left: {bus.capacity - bus.count}</div>
          <div>Status: {status}</div>
          {bus.time} 
        </div>
        <div className="flex justify-end mt-4">
          {isAdmin && (
            <Link to={`/schedule/bus/${bus.id}`} className="btn border-4 border-white text-white bg-transparent hover:bg-green-500 hover:text-white font-semibold py-1 px-3 rounded-full mr-2 transition-colors duration-200 text-sm md:text-base">
              Generate QR Code
            </Link>
          )}
          <Link to={`/schedule/bus/${bus.id}`} className="btn border-4 border-white text-white bg-transparent hover:bg-blue-500 hover:text-white font-semibold py-1 px-3 rounded-full mr-2 transition-colors duration-200 text-sm md:text-base">
            Scan QR Code
          </Link>
          <Link to="/demo" className="btn border-4 border-white text-white bg-transparent hover:bg-purple-500 hover:text-white font-semibold py-1 px-3 rounded-full transition-colors duration-200 text-sm md:text-base">
            Bus Live Tracking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusComponent;
