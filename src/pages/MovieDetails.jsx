import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { IoEarth } from "react-icons/io5";
import { BiSolidMoviePlay } from "react-icons/bi";
import Cast from "../components/Cast";
import Loading from "../components/Loading";
import logo from "../assets/second_logo.png";
import { fetchMovie, trailerMovie } from "../store/Slices/fetchMovieSlice";
import SectionFixed from "../components/SectionFixed";
import Section from "../components/Section";
import { nowPlayingMovies } from "../store/Slices/MovieSlice";
import NotFound from "./NotFound";

function MovieDetails() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movieList = useSelector((state) => state.fetchMovie.movieData);
  const nowPlyingData = useSelector((state) => state.movies.nowPlaying);
  const { currentPage } = useSelector((state) => state.pagination);
  const randomPage = Math.floor(Math.random(currentPage) * 50);

  const movieData = movieList.data;
  const trailerList = useSelector((state) => state.fetchMovie.trailer);
  const trailerData = trailerList.data;

  const navigate = useNavigate();

  const officialTrailer = trailerData.filter((trailer) => {
    return trailer.type === "Trailer";
  });

  // Extract Genre List
  const genresBox = movieData.genres?.map((genre) => (
    <p
      key={genre.id}
      className="p-2 bg-[var(--bg-secondary-color)] text-white font-semibold rounded-full"
    >
      {genre.name}
    </p>
  ));

  // Get Year
  const year = new Date(movieData.release_date).getFullYear();

  // runtime
  const hours = Math.trunc(movieData.runtime / 60);
  const minutes = movieData.runtime % 60;
  const fullTime = `${hours ? hours : ""} : ${minutes}`;

  console.log(movieList);

  useEffect(() => {
    if (!movieData || movieData.id !== Number(movieId)) {
      dispatch(fetchMovie(movieId));
      dispatch(nowPlayingMovies(randomPage));
      dispatch(trailerMovie(movieId));
    }

    document.title = movieData.title || "Cinema Scope";
  }, [movieId, dispatch]);

  if (movieList.status === "failed") {
    return <NotFound />;
  }

  if (movieList.loading || movieData.length === 0) {
    return <Loading />;
  }

  console.log(movieList);

  // if (!movieList) {
  //   return <NotFound />;
  // }

  return (
    <section className="w-full container mx-auto">
      {trailerList.loading ? (
        <Loading />
      ) : (
        <div className="trailer mt-10 w-full h-[300px] md:h-[600px] xl:h-[calc(100vh - 112px)] overflow-hidden rounded-3xl">
          {officialTrailer?.length > 0 || trailerData?.length > 0 ? (
            <iframe
              className="block w-full h-full object-cover"
              src={
                officialTrailer?.length > 0
                  ? `https://www.youtube.com/embed/${officialTrailer[0].key}?autoplay=1&mute=1&loop=1&playlist=${officialTrailer[0].key}&modestbranding=1&controls=1&showinfo=0`
                  : `https://www.youtube.com/embed/${trailerData[0].key}?autoplay=1&mute=1&loop=1&playlist=${trailerData[0].key}&modestbranding=1&controls=1&showinfo=0`
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
      )}
      <Cast />
      <div className="relative movieInfo mt-16 flex flex-col lg:flex-row">
        <div className="poster rounded-3xl w-full self-center mb-10 sm:w-[65%] lg:w-[350px]">
          <img
            className="rounded-3xl w-full h-full"
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData?.poster_path}`
                : `${logo}`
            }
            alt="poster Image"
          />
          <a
            href={movieData.homepage}
            target="_blank"
            className="watch-now w-full px-5 p-3 rounded-3xl bg-[var(--bg-secondary-color)] mt-5 flex justify-center items-center duration-[0.4s] hover:bg-[var(--primary-color)]"
          >
            <BiSolidMoviePlay size={50} />
            <span className="text-2xl ml-3 font-semibold">Watch Now</span>
          </a>
        </div>
        <div className="info flex-1 sm:ml-8">
          <div className="header flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
            <h1 className="title text-2xl sm:text-3xl font-semibold">
              {movieData?.title}
            </h1>
          </div>
          <div className="overview-container mt-6 mb-10">
            <div className="head relative before:content-[''] before:w-[3px] before:h-full before:bg-[var(--primary-color)] before:absolute before:top-0 before:left-0 mb-5">
              <p className="text-xl font-bold text-[var(--primary-color)] ml-4">
                Overview
              </p>
            </div>
            <p className="overview bg-[var(--bg-secondary-color)] w-fit h-fit px-4 py-3 rounded-3xl">
              {movieData?.overview ? movieData.overview : "No Overview"}
            </p>
          </div>
          <div className="head relative before:content-[''] before:w-[3px] before:h-full before:bg-[var(--primary-color)] before:absolute before:top-0 before:left-0 mb-5 mt-16 ">
            <p className="text-xl font-bold text-[var(--primary-color)] ml-4">
              Details
            </p>
          </div>
          <div className="genrs flex justify-start items-center gap-2 ">
            {genresBox ? genresBox : ""}
          </div>
          <div className="information mt-5 space-y-3">
            <div className="box flex items-center">
              <div className="inner-box bg-gradient-to-r p-2 rounded-full flex from-[var(--bg-secondary-color)] from-50% via-[#171b26] to-[var(--bg-color)]">
                <FaRegCalendarAlt size={20} />
                <span className="ml-2 mr-5">Release year :</span>
              </div>
              <p>{!isNaN(year) ? year : ""}</p>
            </div>
            <div className="box flex items-center">
              <div className="inner-box bg-gradient-to-r p-2 rounded-full flex from-[var(--bg-secondary-color)] from-50% via-[#171b26] to-[var(--bg-color)]">
                <MdAccessTime size={20} />
                <span className="ml-2 mr-5">Run Time :</span>
              </div>
              <p>{fullTime}</p>
            </div>
            <div className="box flex items-center">
              <div className="inner-box bg-gradient-to-r p-2 rounded-full flex from-[var(--bg-secondary-color)] from-50% via-[#171b26] to-[var(--bg-color)]">
                <AiFillStar size={20} />
                <span className="ml-2 mr-5">Rating :</span>
              </div>
              <p>
                {!isNaN(movieData?.vote_average?.toFixed(1))
                  ? movieData?.vote_average?.toFixed(1)
                  : ""}
              </p>
            </div>
            <div className="box flex items-center">
              <div className="inner-box bg-gradient-to-r p-2 rounded-full flex from-[var(--bg-secondary-color)] from-50% via-[#171b26] to-[var(--bg-color)]">
                <IoEarth size={20} />
                <span className="ml-2 mr-5">Country :</span>
              </div>
              <p>{movieData?.production_countries?.[0]?.name}</p>
            </div>
            <div className="box flex items-center">
              <div className="inner-box bg-gradient-to-r p-2 rounded-full flex from-[var(--bg-secondary-color)] from-50% via-[#171b26] to-[var(--bg-color)]">
                <FaRegCalendarAlt size={20} />
                <span className="ml-2 mr-5 ">Date Release :</span>
              </div>
              <p>{movieData?.release_date}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionFixed category="Now Playing" data={nowPlyingData.data} />
      <Section data={nowPlyingData.data} category="Now Playing" toggle="true" />
    </section>
  );
}

export default MovieDetails;
