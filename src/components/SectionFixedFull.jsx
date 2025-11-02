import logo from "../assets/second_logo.png";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function SectionFixedFull(props) {
  if (props?.data?.length === 0) {
    return <Loading />;
  }
  return (
    <section className="movies-section container mx-auto mt-16 mb-5 relative">
      <div className="moviesContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {props.data &&
          props.data.map((movie) => (
            <div
              key={movie.id}
              className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/90 after:to-transparent after:rounded-3xl duration-[0.4s] overflow-hidden group"
            >
              <div className="rating absolute top-4 left-4 z-10 w-11 h-11 rounded-full bg-black/50 border-2 border-[var(--primary-color)] flex justify-center items-center pointer-events-none">
                {movie.vote_average.toFixed(1)}
              </div>
              <div
                key={movie.id}
                className="relative overflow-hidden group rounded-3xl duration-300"
              >
                <Link
                  to={`/movies/${movie.id}`}
                  className="block aspect-[2/3] relative rounded-3xl overflow-hidden duration-[0.4s] before:content-[''] before:absolute before:left-0 before:bottom-0  before:w-full before:h-0 hover:before:bg-black/50 hover:before:h-full"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : logo
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover object-center rounded-3xl"
                  />

                  {/* OverLay  */}
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>

                  {/* Voteing */}
                  <div className="absolute top-4 left-4 z-10 w-11 h-11 rounded-full bg-black/50 border-2 border-[var(--primary-color)] flex justify-center items-center pointer-events-none">
                    {movie.vote_average.toFixed(1)}
                  </div>

                  {/* Overview */}
                  <p className="line-clamp-4 pointer-events-none absolute left-2 text-[12px] text-white z-10 bottom-[-100%] duration-300 group-hover:bottom-[20%]">
                    {movie.overview}
                  </p>

                  {/* Title */}
                  <div className="absolute bottom-4 left-2 px-2 rounded z-10 pointer-events-none">
                    <p className="text-md font-bold text-white">
                      {movie.title ? movie.title : movie.name}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default SectionFixedFull;
