import { Fragment } from "react";
import { Link } from "react-router-dom";

function DropdowmMenu({ toggleMovies, toggleGenres, customCss, handleClose }) {
  const moviesMenu = [
    { id: 1, label: "Egypt", path: "/country/egypt" },
    { id: 2, label: "Saudi Arabia", path: "/country/saudi_arabia" },
    { id: 3, label: "Spain", path: "/country/spain" },
    { id: 4, label: "UK", path: "/country/united_kingdom" },
    { id: 5, label: "US", path: "/country/united_state" },
    { id: 6, label: "Germany", path: "/country/germany" },
    { id: 7, label: "Now Playing", path: "/category/now_playing" },
    { id: 8, label: "Popular", path: "/category/popular" },
    { id: 9, label: "Top Rated", path: "/category/top_rated" },
  ];

  const genresMenu = [
    { id: 28, label: "Action", path: "/genres/action" },
    { id: 12, label: "Adventure", path: "/genres/adventure" },
    { id: 16, label: "Animation", path: "/genres/animation" },
    { id: 35, label: "Comedy", path: "/genres/comedy" },
    { id: 80, label: "Crime", path: "/genres/crime" },
    { id: 18, label: "Drama", path: "/genres/drama" },
    { id: 36, label: "History", path: "/genres/history" },
    { id: 878, label: "Science Fiction", path: "/genres/science_fiction" },
    { id: 53, label: "Thriller", path: "/genres/thriller" },
    { id: 10752, label: "War", path: "/genres/war" },
  ];

  return (
    <div
      className={`
    dropdowm-menu absolute duration-300 left-0 w-full h-fit text-center rounded-lg z-[450] bg-white
    ${
      customCss
        ? customCss
        : toggleMovies || toggleGenres
          ? "top-10 opacity-100 pointer-events-auto "
          : "top-5 opacity-0 pointer-events-none"
    }
  `}
    >
      {toggleMovies && (
        <ul>
          {moviesMenu.map((movie, index) => (
            <Fragment key={movie.id}>
              <li
                onClick={handleClose ? handleClose : null}
                className={`${movie.id === 1 ? "rounded-t-lg" : movie.id === 9 ? "rounded-b-lg" : ""} duration-300 hover:bg-[#eee] py-2 cursor-pointer`}
              >
                <Link className="text-black" to={movie.path}>
                  {movie.label}
                </Link>
              </li>
              {index !== moviesMenu.length - 1 && <hr />}
            </Fragment>
          ))}
        </ul>
      )}

      {toggleGenres && (
        <ul>
          {genresMenu.map((genre, index) => (
            <Fragment key={genre.id}>
              <li
                onClick={handleClose}
                className={`${genre.id === 28 ? "rounded-t-lg" : genre.id === 10752 ? "rounded-b-lg" : ""} duration-300 hover:bg-[#eee] py-2 cursor-pointer`}
              >
                <Link className="text-black" to={genre.path}>
                  {genre.label}
                </Link>
              </li>
              {index !== genresMenu.length - 1 && <hr />}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdowmMenu;
