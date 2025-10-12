import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Slider({ data }) {
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          200: { slidesPerView: 2 },
          540: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <a
              href="#"
              className=" main relative block duration-[0.4s] before:content-[''] before:absolute before:left-0 before:bottom-0  before:w-full before:h-0 hover:before:bg-black/50 hover:before:h-full hover:scale-105 rounded-lg overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="rounded-lg w-full extraSm:h-[250px] h-[420px]  object-cover "
              />
              <div className="absolute bottom-2 left-2 px-2 rounded">
                <p className="text-l font-bold text-white">
                  {item.title ? item.title : item.name}
                </p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
