import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-[var(--bg-color)] shadow-md backdrop-blur-3xl border-gray-200 w-full top-0 left-0 max-h-[72px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse self-center text-2xl font-semibold whitespace-nowrap text-[var(--primary-color)]"
        >
          Cinema Scope
        </Link>

        {/* Right Side (Search + Menu Button) */}
        <div className="flex md:order-2  items-center gap-2">
          {/* Search Input (Desktop Only) */}
          <div className="hidden md:block relative">
            <form method="get">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  color="white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 bg-transparent border border-white rounded-lg text-sm outline-none focus:text-white focus:border-[var(--primary-color)]"
                placeholder="Search..."
              />
            </form>
          </div>

          {/* Toggle Button (Mobile) */}
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-menu"
            aria-expanded={toggleMenu}
          >
            <svg
              className="w-5 h-5"
              color="white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Main Menu */}
        <div
          id="navbar-menu"
          className={`${
            toggleMenu ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-500`}
        >
          {/* Search (Mobile) */}
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4"
                color="white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar-mobile"
              className="block w-full p-2 ps-10 text-sm bg-transparent border border-gray-500 rounded-lg text-white outline-none focus:border-[var(--primary-color)]"
              placeholder="Search..."
            />
          </div>

          {/* Links */}
          <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 border-gray-700 bg-[#141414d9] md:bg-transparent">
            <li>
              <NavLink
                to="/"
                onClick={() => setToggleMenu(false)}
                className="block py-2 px-3 text-white rounded-sm duration-300 hover:text-[var(--primary-color)]"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                onClick={() => setToggleMenu(false)}
                className="block py-2 px-3 text-white rounded-sm duration-300 hover:text-[var(--primary-color)]"
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/genres"
                onClick={() => setToggleMenu(false)}
                className="block py-2 px-3 text-white rounded-sm duration-300 hover:text-[var(--primary-color)]"
              >
                Genres
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
