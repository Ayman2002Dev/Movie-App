import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import logo from "../assets/second_logo.png";

import "swiper/css";
import "swiper/css/navigation";

function KnownForSwiper({ movies, swiperRef }) {
  console.log(movies);

  return (
    <div className="mt-5 w-full overflow-hidden">
      <Swiper
        className="w-full overflow-hidden"
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{ delay: 5000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1400: { slidesPerView: 6 },
        }}
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movies/${movie.id}`} className="block">
              <div className="w-full aspect-[2/3] bg-[#dbdbdb] self-center  rounded-lg overflow-hidden">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : logo
                  }
                  alt={movie.original_title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h5 className="mt-2 text-sm p-2 pt-0 duration-300 hover:text-[var(--primary-color)]">
                {movie.title}
              </h5>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default KnownForSwiper;
