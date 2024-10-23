import React, { useState } from "react";
import { Link } from "react-router-dom";
const Cards = () => {
  // Example bus data (replace this with your actual bus data)
  const busData = [
    { id: 1, start: "Location A", destination: "Location B", capacity: 50, count: 10, time: "10:00 AM" },
    { id: 2, start: "Location C", destination: "Location D", capacity: 60, count: 20, time: "11:00 AM" },
    // Add more bus data as needed
  ];

  const userRole = localStorage.getItem('role');
  const isAdmin = userRole === "admin";

  return (
    <div className="p-4">
      <h1 className="text-center mb-4">Bus Cards</h1>
      <div className="flex flex-wrap justify-center">
        {busData.map((bus, index) => {
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

          const colorClass = colors[index % colors.length]; // Cycle through colors based on index
          const [statusColor, setStatusColor] = useState("bg-green-500"); // Default status color

          const handleColorChange = (e) => {
            switch (e.target.value) {
              case "red":
                setStatusColor("bg-red-500");
                break;
              case "yellow":
                setStatusColor("bg-yellow-500");
                break;
              case "green":
                setStatusColor("bg-green-500");
                break;
              default:
                setStatusColor("bg-green-500"); // Fallback
            }
          };

          return (
            <div className={`${colorClass} ${statusColor} text-white mb-2 mx-4 rounded-lg shadow-lg w-80`} key={bus.id}>
              <div className="p-4">
                <h2 className="text-lg font-bold">Bus {bus.id}</h2>
                <div>
                  {bus.start} ---- {bus.destination}
                  <div>Seats Left: {bus.capacity - bus.count}</div>
                  {bus.time}
                </div>
                
                {/* Status Radio Buttons (only for admin) */}
                {isAdmin && (
                  <div className="mt-4">
                    <h3 className="text-sm font-bold">Bus Status:</h3>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="red"
                          checked={statusColor === "bg-red-500"}
                          onChange={handleColorChange}
                          className="mr-2"
                        />
                        <span className="text-red-500">Cancelled</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="yellow"
                          checked={statusColor === "bg-yellow-500"}
                          onChange={handleColorChange}
                          className="mr-2"
                        />
                        <span className="text-yellow-500">Delayed</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="green"
                          checked={statusColor === "bg-green-500"}
                          onChange={handleColorChange}
                          className="mr-2"
                        />
                        <span className="text-green-500">On Time</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  {isAdmin && (
                    <Link to={`/schedule/bus/${bus.id}`} className="btn bg-green-500 text-white hover:bg-green-600 font-semibold py-1 px-3 rounded mr-2">
                      Generate QR Code
                    </Link>
                  )}
                  <Link to={`/schedule/bus/${bus.id}`} className="btn bg-blue-500 text-white hover:bg-blue-600 font-semibold py-1 px-3 rounded mr-2">
                    Scan QR Code
                  </Link>
                  <Link to="/demo" className="btn bg-purple-500 text-white hover:bg-purple-600 font-semibold py-1 px-3 rounded">
                    Bus Live Tracking
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
