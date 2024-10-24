import React, { useEffect, useState } from "react";
import BusComponent from "./BusComponent";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Schedule = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  


  const [buses, setBuses] = useState([]);
  const d = new Date();
  let day = d.getDay();
  const today = daysOfWeek[day];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8804/api/users/schedule/${today}`);
      if (res.status === 200) {
        console.log("Fetched data:", res.data);
        setBuses(res.data);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  console.log("Buses state:", buses);

  return (
    <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-700">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 gap-4 py-14 p-auto m-auto min-h-screen sm:grid-cols-2 lg:grid-cols-3">
        {buses.map((bus, index) => (
          <BusComponent bus={bus} key={bus.id} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
