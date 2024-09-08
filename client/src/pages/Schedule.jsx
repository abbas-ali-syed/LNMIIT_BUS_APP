import React, { useEffect, useState } from "react";
import BusComponent from "./BusComponent";
import axios from "axios";

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
  const [buses, setBuses] = useState([]);
  const d = new Date();
  let day = d.getDay();

  const today = daysOfWeek[day];
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:8804/schedule/${today}`);
      if (res.status === 200) {
        setBuses(res.data);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-8 p-4 m-10">
      {buses.map((bus) => (
        <BusComponent bus={bus} />
      ))}
    </div>
  );
};

export default Schedule;
