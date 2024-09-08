import React from "react";
import { Link } from "react-router-dom";

const BusComponent = ({ bus }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Bus</h2>
        <p>
          {bus.start} ---- {bus.destination}
        </p>
        <div className="card-actions justify-end">
          <Link to={`bus/${bus._id}`} className="btn btn-primary">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusComponent;
