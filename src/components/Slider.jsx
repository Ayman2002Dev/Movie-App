import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import logo from "../assets/second_logo.png";

function Slider({ data }) {
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
          1920: { slidesPerView: 6 },
        }}
      >
        {data?.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/95 after:via-black/70 after:to-transparent after:rounded-3xl duration-[0.4s] overflow-hidden group"
          >
            <div className="rating absolute top-4 left-4 z-10 w-11 h-11 rounded-full bg-black/50 border-2 border-[var(--primary-color)] flex justify-center items-center pointer-events-none">
              {movie.vote_average.toFixed(1)}
            </div>
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
                alt={movie.original_title}
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
                <p className="text-md font-bold text-white pointer-events-none">
                  {movie.original_title ? movie.original_title : movie.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
