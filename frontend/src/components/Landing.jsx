import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaMoon, FaUser, FaTimes } from "react-icons/fa";
import MenuDrawer from "./MenuDrawer";

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center gap-10 px-4 py-6">
        {/* LOGO */}
        <div className="font-bold text-sm">
          <h1>Logo</h1>
        </div>

        {/* MENU */}
        <div className="relative inline-flex items-center gap-4 bg-[#0B0B14] rounded-full px-6 py-[3.5px] ">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 text-white"
          >
            {menuOpen ? (
              <>
                <FaTimes className="text-md" />
                <span className="text-md">Close</span>
              </>
            ) : (
              <>
                <FaBars className="text-md" />
                <span className="text-md">Menu</span>
              </>
            )}
          </button>

          {/* Dark Mode */}
          <button className="w-6 h-6 rounded-full border border-gray-600 bg-[#0B0B14] flex items-center justify-center">
            <FaMoon className="text-white text-lg" />
          </button>

          {/* Progress */}
          <div className="px-3 py-1 rounded-full bg-gray-700 text-white text-md font-semibold">
            0%
          </div>

          {/* Drawer */}
          <MenuDrawer
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          {/* Sign In */}
          <Link to="/login">
            <div className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center">
              <FaUser className="text-black text-sm" />
            </div>
          </Link>

          {/* Get Started */}
          <Link to="/register">
            <button className="bg-black rounded-full text-white text-sm px-4 py-2 hover:bg-orange-500 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;