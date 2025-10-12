import poster from "../assets/poster.jpg";

function Movie(props) {
  const { title, poster } = props;
  const posterUrl = `https://image.tmdb.org/t/p/w500/${poster}`;
  const posterAlt = `${title} poster`;

  return (
    <a href="#" className="movie-card ">
      <div className="poster w-full h-[400px] rounded-[10px] hover:scale-110 overflow-hidden duration-[0.4s]">
        <img
          src={posterUrl}
          alt={posterAlt}
          className="size-full rounded-[10px]"
        />
      </div>
      <div className="info flex justify-between items-center mt-4">
        <h4
          className="title whitespace-nowrap w-[200px] text-ellipsis overflow-hidden text-white"
          title={title}
        >
          {title}
        </h4>
        <div className="type-time flex justify-center items-center gap-[10px] text-white">
          {/* <div className="type p-1 bg-[var(--primary-color)] text-white rounded-md font-medium">
            HD
          </div> */}
          <div className="time text-white">3:12:00</div>
        </div>
      </div>
    </a>
  );
}

export default Movie;
