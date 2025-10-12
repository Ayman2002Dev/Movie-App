import { CiSearch } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar w-full  left-0 top-2 z-10 h-fit  flex justify-center items-center pt-8 px-5">
      <div className="left">
        <Link to="/" className="active text-white font-title font-bold">
          Home
        </Link>
        <Link to="/genre" className="text-white font-title mx-5 font-bold">
          Genre
        </Link>
        <Link to="/genre/country" className="text-white font-title font-bold">
          Country
        </Link>
      </div>

      <div className="search mx-[30px] flex w-[400px] relative">
        <input
          className="w-full py-3 px-6 rounded-xl bg-transparent border border-white placeholder:text-white  placeholder:text-l text-white caret-white outline-none"
          type="text"
          placeholder="Search "
        />
        <CiSearch
          color="white"
          className=" text-[25px] absolute right-6 top-1/2 -translate-y-1/2"
        />
      </div>

      <div className="right flex justify-center items-center">
        <Link to="/" className="text-white font-title font-bold">
          Movies
        </Link>
        <Link to="/" className="text-white font-title mx-5 font-bold">
          Series
        </Link>
        <Link to="/" className="text-white font-title font-bold">
          Animation
        </Link>

        <div className="auth ml-[30px]">
          <Link to="/" className="text-white font-title font-bold">
            Login
          </Link>
          <span className="text-white">/</span>
          <Link to="/" className="text-white font-title font-bold">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
