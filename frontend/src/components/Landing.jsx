import { Link } from "react-router-dom";
import { FaUser, FaBars, FaMoon } from "react-icons/fa";

function Landing() {
  return (
    <>
      <div className="flex justify-between items-center gap-10 px-4 py-3 ">
        {/* LOGO */}
        <div className="font-bold">
          <h1>Logo</h1>
        </div>

        {/* MENU */}
        <div className="inline-flex items-center gap-4 bg-[#0B0B14] rounded-full px-6 py-[3.5px]">
          {/* Menu */}
          <button className="flex items-center gap-3 text-white">
            <FaBars className="text-md" />
            <span className="text-md ">Menu</span>
          </button>

          {/* Dark mode */}
          <button className="w-6 h-6 rounded-full border border-gray-600 bg-[#0B0B14] flex items-center justify-center">
            <FaMoon className="text-white text-lg" />
          </button>

          {/* Progress */}
          <div className="px-4 py-1 rounded-full bg-gray-700 text-white text-md font-semibold">
            0%
          </div>
        </div>

        {/* SIGN */}
        <div className="hidden flex-row items-center gap-4 md:flex">
          <Link to="/login">
            <div className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center">
              <FaUser className="text-black text-sm" />
            </div>
          </Link>

          {/* GET STARTED BUTTON */}
          <Link to="/register">
            <button className="bg-black rounded-full w-fit  text-white text-sm px-4 py-2">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
