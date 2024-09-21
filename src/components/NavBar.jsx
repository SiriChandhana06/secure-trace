import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full px-5 py-3 flex items-center justify-between border-b-2 shadow-lg">
      <div>
        <h1 className="text-3xl font-medium cursor-pointer">SecureTrace</h1>
      </div>

      <div className="sm:flex space-x-10 hidden">
        <Link to="/" className="text-black font-medium">
          Dashboard
        </Link>
        <Link to="/visualizer" className="text-black font-medium">
          Visualizer
        </Link>
        <Link to="/portfolio_tracker" className="text-black font-medium">
          Portfolio Tracker
        </Link>
      </div>

      <div className="flex items-center justify-center space-x-3 relative">
        <Link to="/login" className="text-black font-medium">
          Login
        </Link>
      <button className="sm:hidden"
      onClick={() => setShowMenu(!showMenu)}
      ><IoReorderThree className="text-3xl" /></button>
      {showMenu && (
        <div className="absolute sm:hidden border-2 rounded-xl px-4 py-5 top-8 right-1 bg-slate-50 shadow-lg">
          <div className="flex flex-col gap-2">
        <Link to="/" className="text-black font-medium text-nowrap" onClick={() => setShowMenu(!showMenu)}>
          Dashboard
        </Link>
        <Link to="/visualizer" className="text-black font-medium text-nowrap" onClick={() => setShowMenu(!showMenu)}>
          Visualizer
        </Link>
        <Link to="/portfolio_tracker" className="text-black font-medium text-nowrap" onClick={() => setShowMenu(!showMenu)}>
          Portfolio Tracker
        </Link>
      </div>
        </div>
      )}
      </div>

    </div>
  );
}
