// import React, { useEffect, useState } from "react";
// import BusComponent from "./BusComponent";
// import axios from "axios";
// import Navbar from "./Navbar";

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const Schedule = () => {
  
//   const [buses, setBuses] = useState([]);
//   const d = new Date();
//   let day = d.getDay();

//   const today = daysOfWeek[day];
//   useEffect(() => {
//     async function fetchData() {
//       const res = await axios.get(`http://localhost:8804/api/users/schedule/${today}`);
//       if (res.status === 200) {
//         console.log('Fetched data:', res.data);
//         setBuses(res.data);
//       }
//     }
//     fetchData();
//   }, []);

//   console.log('Buses state:', buses);

//   return (
//     <div>
     
//     <div className="grid grid-cols-3 gap-4 p-4 m-10 min-h-screen">
//       {buses.map((bus) => (
//         <div key={bus.id} className="bg-base-100 shadow-xl p-4 min-w-[300px]">
//           <BusComponent bus={bus} />
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Schedule;
import React, { useEffect, useState } from "react";
import BusComponent from "./BusComponent";
import axios from "axios";
import Navbar from "./Navbar";

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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8804/api/users/schedule/${today}`);
      if (res.status === 200) {
        console.log('Fetched data:', res.data);
        setBuses(res.data);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const updateBusCount = (busId, newCount) => {
    setBuses(prevBuses =>
      prevBuses.map(bus =>
        bus.id === busId ? { ...bus, count: newCount } : bus
      )
    );
  };

  console.log('Buses state:', buses);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-4 m-10 min-h-screen">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-base-100 shadow-xl p-4 min-w-[300px]">
            <BusComponent bus={bus} updateBusCount={updateBusCount} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
