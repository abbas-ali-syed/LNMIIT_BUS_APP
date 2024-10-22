// import React from "react";
// import Demo from "./Demo";
// import { Link } from "react-router-dom";

// const BusComponent = ({ bus }) => {
//   console.log('Bus props:', bus);

//   return (
//     <div className="card bg-base-100 w-96 shadow-xl">
//       {/* <figure>
//         <img
//           src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//           alt="Shoes"
//         />
//       </figure> */}
//       <div className="card-body">
//         <h2 className="card-title">Bus {bus.id}</h2>
//         <div>
//           {bus.start} ---- {bus.destination}
//           <div>Seats Left {bus.count}</div>
          
//           {bus.time} 
//         </div>
//         <div className="card-actions justify-end">
//         <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> <Link to={`bus/${bus.id}`} className="btn btn-primary">
//             Generate QR code
//           </Link></button>
//           <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">  <Link to="/demo" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//             Bus Live Tracking
//           </Link></button>
         
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BusComponent;
import React from "react";
import { Link } from "react-router-dom";

const BusComponent = ({ bus }) => {
  const userRole = localStorage.getItem('role');
  const isAdmin = userRole === "admin";

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Bus {bus.id}</h2>
        <div>
          {bus.start} ---- {bus.destination}
          <div>Seats Left {bus.capacity - bus.count}</div>
          {bus.time} 
        </div>
        <div className="card-actions justify-end">
          {isAdmin && (
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <Link to={`/schedule/bus/${bus.id}`} className="btn btn-primary">
                Generate QR code
              </Link>
            </button>
          )}
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <Link to={`/schedule/bus/${bus.id}`} className="btn btn-primary">
              Scan QR code
            </Link>
          </button>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <Link to="/demo" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Bus Live Tracking
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusComponent;