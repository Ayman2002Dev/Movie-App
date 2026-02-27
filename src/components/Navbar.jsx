import { ChevronDown, ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import useDebounce from "../hooks/useDebounce";
import Loading from "./Loading";
import { IoMdRadioButtonOn } from "react-icons/io";
import DropdowmMenu from "./DropdowmMenu";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMovies, setToggleMovies] = useState(false);
  const [toggleGenres, setToggleGenres] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { results, loading } = useDebounce({ query, delay: 500 });
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const genresMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    inputRef.current.blur();
    setOpen(false);
  };
  const handleClose = () => {
    setToggleMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setToggleMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="navbar-section" ref={containerRef}>
      <nav className="relative z-[9999] bg-[var(--bg-color)] shadow-sm shadow-[var(--primary-color)] backdrop-blur-3xl border-gray-200 w-full max-h-[72px]">
        <div className="max-w-screen-xl relative flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center self-center text-2xl font-semibold whitespace-nowrap text-[var(--primary-color)]"
          >
            Cinema Scope
          </Link>

          {/* Links in Large screen */}
          <ul className="hidden lg:flex flex-col items-center p-4 lg:p-0 mt-4 font-medium rounded-lg lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
            <li>
              <NavLink
                to="/"
                onClick={() => setToggleMenu(false)}
                className="block py-2 px-7 text-white rounded-sm duration-300 hover:text-[var(--primary-color)]"
              >
                Home
              </NavLink>
            </li>
            <li
              className="relative"
              onMouseLeave={() => setToggleMovies(false)}
              onMouseMove={() => setToggleMovies(true)}
            >
              <div className="py-2 px-7 text-white rounded-sm duration-300 hover:text-[var(--primary-color)] flex justify-between items-center w-fit relative">
                <ChevronLeft
                  className={`${toggleMovies ? "-rotate-90" : "rotate-0"} cursor-pointer duration-300 hover:text-[var(--primary-color)]`}
                />
                <NavLink to="/movies" className="ml-2">
                  Movies
                </NavLink>
              </div>
              <DropdowmMenu
                toggleMovies={toggleMovies}
                handleClose={handleClose}
              />
            </li>
            <li
              className="relative"
              onMouseLeave={() => setToggleGenres(false)}
              onMouseMove={() => setToggleGenres(true)}
            >
              <div className="py-2 px-7 text-white rounded-sm duration-300 hover:text-[var(--primary-color)] flex justify-between items-center w-fit">
                <ChevronLeft
                  className={`${toggleGenres ? "-rotate-90" : "rotate-0"} cursor-pointer duration-300 hover:text-[var(--primary-color)]`}
                />
                <NavLink to="/genres" className="ml-2">
                  Genres
                </NavLink>
              </div>
              <DropdowmMenu
                toggleGenres={toggleGenres}
                handleClose={handleClose}
              />
            </li>
          </ul>

          {/* Right Side (Search + Menu Button) */}
          <div className="flex lg:order-2 items-center gap-2 w-fit lg:w-[400px]">
            {/* Search Input (Desktop Only) */}
            <div className="hidden lg:block relative w-full group ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
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
                onChange={handleQuery}
                onClick={handleOpen}
                ref={inputRef}
                autoComplete="off"
              />

              {/* Search results */}
              {open && (
                <div className="search-results absolute top-full right-0 mt-4 w-full min-h-80 max-h-[450px] overflow-auto rounded-lg bg-[#161e2b] p-5 transition-all duration-200">
                  {loading ? (
                    <Loading />
                  ) : results.length ? (
                    <div className="flex flex-col justify-center items-start gap-4">
                      {results.map((item) => (
                        <Link
                          onClick={handleClick}
                          to={`/movies/${item.id}`}
                          key={item.id}
                          className="bg-[#171b27] w-full p-2 pl-1 rounded-xl 
                          transition-all duration-300 
                        hover:bg-[#1f2636]"
                        >
                          <div className="flex items-center gap-3">
                            {/* Poster */}
                            <img
                              className="rounded-lg w-[65px] h-[45px] object-cover"
                              src={
                                item.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
                                  : logo
                              }
                              alt="poster Image"
                            />

                            {/* Content */}
                            <div className="overflow-hidden">
                              <p
                                title={item.title || item.original_title}
                                className="text-[13px] font-semibold text-[#afb9be] truncate
                                transition-colors duration-300 
                              hover:text-white"
                              >
                                {item.title || item.original_title}
                              </p>

                              <div className="movie-data-box flex justify-start items-center gap-2 mt-1">
                                {item?.genre_ids &&
                                  item?.genre_ids
                                    ?.slice(0, 2)
                                    .map((genre, index) => (
                                      <div
                                        key={genre}
                                        className="gener-box flex items-center gap-1"
                                      >
                                        <IoMdRadioButtonOn />
                                        <p className="text-[12px] text-gray-400">
                                          {genresMap[genre]}
                                        </p>
                                      </div>
                                    ))}

                                {item?.release_date && (
                                  <div className="gener-box flex items-center gap-1">
                                    <IoMdRadioButtonOn />
                                    <p className="text-[12px] text-gray-400">
                                      {new Date(
                                        item?.release_date,
                                      ).getFullYear()}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p>No results found for "{query}"</p>
                  )}
                </div>
              )}
            </div>

            {/* Toggle Button (Mobile) */}
            <button
              onClick={handleToggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden focus:outline-none"
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
        </div>

        {/* Main Menu Mobile */}
        <div
          id="navbar-menu"
          className={`${
            toggleMenu
              ? "opacity-100 absolute z-[1000] bg-[#374151] p-5 top-[72px] w-full"
              : "opacity-0 -top-[10px] hidden"
          } items-end justify-start transition-all duration-500 lg:hidden`}
        >
          {/* Links in Small screen */}
          <ul className=" lg:flex flex-col items-center p-4 lg:p-0 mt-4 font-medium rounded-lg lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent space-y-2">
            <li>
              <NavLink
                to="/"
                onClick={handleClose}
                className="block py-2 px-3 text-white rounded-sm duration-300 hover:text-[var(--primary-color)]"
              >
                Home
              </NavLink>
            </li>
            <li
              className="relative"
              onClick={() => setToggleMovies((prev) => !prev)}
            >
              <div className="py-2 px-0 text-white rounded-sm duration-300 hover:text-[var(--primary-color)] flex justify-between items-center w-fit relative">
                <ChevronLeft
                  className={`${toggleMovies ? "-rotate-90" : "rotate-0"} cursor-pointer duration-300 hover:text-[var(--primary-color)]`}
                />
                <NavLink to="/movies" className="ml-2" onClick={handleClose}>
                  Movies
                </NavLink>
              </div>
              <DropdowmMenu
                toggleMovies={toggleMovies}
                customCss="relative top-0 "
                handleClose={handleClose}
              />
            </li>
            <li
              className="relative"
              onClick={() => setToggleGenres((prev) => !prev)}
            >
              <div className="py-2 px-0 text-white rounded-sm duration-300 hover:text-[var(--primary-color)] flex justify-between items-center w-fit">
                <ChevronLeft
                  className={`${toggleGenres ? "-rotate-90" : "rotate-0"} cursor-pointer duration-300 hover:text-[var(--primary-color)]`}
                />
                <NavLink to="/genres" className="ml-2" onClick={handleClose}>
                  Genres
                </NavLink>
              </div>
              <DropdowmMenu
                toggleGenres={toggleGenres}
                customCss="relative top-0"
                handleClose={handleClose}
              />
            </li>
          </ul>

          {/* Search (Tablet/Mobile) */}
          <div className="relative mt-3 lg:hidden">
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
              onChange={handleQuery}
              onClick={handleOpen}
              ref={inputRef}
              autoComplete="off"
            />
          </div>
          {/* Search results on Tablet */}
          {open && (
            <div className="search-results relative mt-4 w-full min-h-80 max-h-[450px] overflow-auto rounded-lg bg-[#161e2b] p-1  sm:p-5  transition-all duration-200">
              {loading ? (
                <Loading />
              ) : results.length ? (
                <div className="flex flex-col justify-center items-start gap-4">
                  {results.map((item) => (
                    <Link
                      onClick={handleClick}
                      to={`/movies/${item.id}`}
                      key={item.id}
                      className="bg-[#171b27] w-full p-2 pl-1 rounded-xl 
                          transition-all duration-300 
                        hover:bg-[#1f2636]"
                    >
                      <div className="flex items-center gap-3">
                        {/* Poster */}
                        <img
                          className="rounded-lg w-[65px] h-[45px] object-cover"
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
                              : logo
                          }
                          alt="poster Image"
                        />

                        {/* Content */}
                        <div className="overflow-hidden">
                          <p
                            title={item.title || item.original_title}
                            className="text-[13px] font-semibold text-[#afb9be] truncate
                                transition-colors duration-300 
                              hover:text-white"
                          >
                            {item.title || item.original_title}
                          </p>

                          <div className="movie-data-box flex justify-start items-center gap-2 mt-1">
                            {item?.genre_ids &&
                              item?.genre_ids
                                ?.slice(0, 2)
                                .map((genre, index) => (
                                  <div
                                    key={genre}
                                    className="gener-box flex items-center gap-1"
                                  >
                                    <IoMdRadioButtonOn />
                                    <p className="text-[12px] text-gray-400">
                                      {genresMap[genre]}
                                    </p>
                                  </div>
                                ))}

                            {item?.release_date && (
                              <div className="gener-box flex items-center gap-1">
                                <IoMdRadioButtonOn />
                                <p className="text-[12px] text-gray-400">
                                  {new Date(item?.release_date).getFullYear()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No results found for "{query}"</p>
              )}
            </div>
          )}
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
