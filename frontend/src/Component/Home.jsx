import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="text-white text-lg font-bold">
          {/* Add your logo or site name here */}
          <div className="flex items-center space-x-2">
            <img src="src/assets/logo.jpg" alt="Logo" className="w-8 h-8" />
            <span>SyncSource</span>
          </div>
        </div>
        <ul className="flex space-x-8 text-white">
          <h2><b>Where code finds its home</b></h2>
          <li>
            <Link to="/login" className="bg-white text-red-500 py-2 px-4 rounded-lg">
            
              Sign In
              
            </Link>
          </li>
          <li>
            <Link to="/register" className="bg-white text-red-500 py-2 px-4 rounded-lg">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-between p-12">
        {/* Left Section */}
        <div className="flex-1">
          <p className="text-gray-500 text-lg mb-2">Get new skills.</p>
          <h1 className="text-5xl font-bold mb-6">
            Learn something new today!!!
          </h1>
          <div className="relative">
         
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-1/2 ml-12"> {/* Added ml-12 for margin-left */}
  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl transform rotate-6 z-0"></div>
  <img
    src="src/assets/hero.jpg"
    alt="Learning"
    className="rounded-2xl shadow-xl relative z-10"
  />
</div>
      </div>

      {/* Social Media Links */}
      <div className="absolute right-0 bottom-0 p-6 space-y-4">
        <a href="#" className="text-white transform rotate-90">
          FACEBOOK
        </a>
        <a href="#" className="text-white transform rotate-90">
          INSTAGRAM
        </a>
        <a href="#" className="text-white transform rotate-90">
          TWITTER
        </a>
      </div>
    </div>
  );
};

export default Home;