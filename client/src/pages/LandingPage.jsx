import React from "react";
import backgroundImage from "../assets/lnmiit.jpg"; // Replace with your image path
import Navbar from "./Navbar";

export const LandingPage = () => {
  return (
    
    <div>
         {/* <Navbar /> */}
   
    <header
      id="header"
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text-white text-center p-6">
        <h1 className="text-5xl text-blue-800 md:text-7xl font-bold mb-4">
          LNMIIT Bus App
        </h1>

        {/* Circle Container */}
        <div className="flex items-center justify-center mt-6">
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-lg md:text-xl font-semibold">
                  Your one-stop solution for a convenient and hassle-free commuting experience.
                </p>
                <p className="mt-2 text-md md:text-lg">
                  Live track your bus, get seat availability at any moment and plan your ride sharing through daily discussions!
                </p>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#features"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded transition duration-300 text-lg"
        >
          Learn More
        </a>
      </div>
    </header>
    </div>
  );
};

export default LandingPage;
