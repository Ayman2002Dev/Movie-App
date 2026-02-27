import React, { useState } from "react";

function TrailerSection({ trailerData }) {
  const [current, setCurrent] = useState(1);
  const officialTrailer = trailerData.filter((trailer) => {
    return trailer.type === "Trailer";
  });

  const handleChange = (tab) => {
    setCurrent(tab);
  };
  return (
    <div className="trailer-section mt-10">
      {officialTrailer?.length > 0 && (
        <div className="trialer-tabs grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 mb-5">
          {officialTrailer?.map((trailer, index) => (
            <button
              className={`${current === index + 1 ? "bg-[var(--primary-color)]" : " bg-[var(--bg-secondary-color)]"} font-[500] p-3 rounded-xl flex justify-center items-center duration-[0.4s] hover:bg-[var(--primary-color)] extraSm:text-sm w-[calc(100% / 2)]`}
              key={index}
              onClick={() => handleChange(index + 1)}
            >
              Trailer {index + 1}
            </button>
          ))}
        </div>
      )}
      <div className="trailer-video">
        <div className="trailer  w-full h-[300px] md:h-[600px] xl:h-[calc(100vh - 112px)] overflow-hidden rounded-3xl">
          {officialTrailer?.length > 0 || trailerData?.length > 0 ? (
            <iframe
              className="block w-full h-full object-cover"
              src={
                officialTrailer?.length > 0
                  ? `https://www.youtube.com/embed/${officialTrailer[current - 1].key}?autoplay=1&mute=1&loop=1&playlist=${officialTrailer[current - 1].key}&modestbranding=1&controls=1&showinfo=0`
                  : `https://www.youtube.com/embed/${trailerData[current - 1].key}?autoplay=1&mute=1&loop=1&playlist=${trailerData[current - 1].key}&modestbranding=1&controls=1&showinfo=0`
              }
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-center py-10 text-gray-400">
              No Trailer Available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrailerSection;
