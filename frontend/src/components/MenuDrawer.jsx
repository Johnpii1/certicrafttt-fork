

import React from "react";
import { Link } from "react-router-dom";

function MenuDrawer({ menuOpen, setMenuOpen }) {
  if (!menuOpen) return null;

  return (
    <div className="absolute top-[-110px] mt-[10vh] right-[-8px] -z-10 md:top-[-90px] md:right-[-10px]">
     <div className="w-[16rem] rounded-3xl bg-gray-300 p-8 text-black shadow-2xl">
        
        {/* Menu links go here */}
        <nav className="mt-8 space-y-8">
  <Link
    to="/"
    onClick={() => setMenuOpen(false)}
    className="block text-sm font-semibold hover:text-gray-800 cursor-pointer"
  >
    Home
  </Link>

  <a
    href="#features"
    onClick={() => setMenuOpen(false)}
    className="block text-sm font-semibold hover:text-gray-800"
  >
    Features
  </a>

  <a
    href="#how-it-works"
    onClick={() => setMenuOpen(false)}
    className="block text-sm font-semibold hover:text-gray-300"
  >
    How It Works
  </a>

  <a
    href="#verification"
    onClick={() => setMenuOpen(false)}
    className="block text-sm font-semibold hover:text-gray-300"
  >
    Verification
  </a>
</nav>


<div className="my-8 border-t border-gray-700"></div>

<div className="space-y-3">
  <Link
    to="/login"
    onClick={() => setMenuOpen(false)}
    className="block text-lg"
  >
    Sign In
  </Link>

  <Link
    to="/register"
    onClick={() => setMenuOpen(false)}
    className="block rounded-full bg-white px-5 py-3 text-center text-black font-semibold"
  >
    Get Started
  </Link>
</div>
      </div>
    </div>
  );
}

export default MenuDrawer;