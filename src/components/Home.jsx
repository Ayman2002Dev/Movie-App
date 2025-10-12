import { BiPlayCircle } from "react-icons/bi";
import { BiCalendar } from "react-icons/bi";
import { BiSolidTime } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { BsChevronDoubleDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, lazy } from "react";
import { popularMovies, nowPlayingMovies } from "../store/Slices/MovieSlice";
import Loading from "./Loading";
import MoviesSlider from "./Slider";
import Section from "./Section";
import { popularSeries, topRatedSeries } from "../store/Slices/SeriesSlice";
const Movie = lazy(() => import("./Movie"));

function Home() {
  const moviesList = useSelector((state) => state.movies);
  const serieslist = useSelector((state) => state.series);

  const currentPage = useSelector((state) => state.pagination.currentPage);
  const dispatch = useDispatch();
  console.log(moviesList);
  useEffect(() => {
    dispatch(popularMovies(currentPage));
    dispatch(nowPlayingMovies(currentPage));
    dispatch(popularSeries(currentPage));
    dispatch(topRatedSeries(currentPage));
    document.title = "Cinema Scope | Home";
  }, [dispatch, currentPage]);
  // console.log(moviesList.movies[0].poster_path);

  const showData = moviesList.popular.map((movie) => {
    return (
      <Suspense key={movie.id} fallback={<Loading />}>
        <Movie title={movie.title} poster={movie.poster_path} />
      </Suspense>
    );
  });

  if (moviesList.loading) return <p>Loading...</p>;
  if (moviesList.error) return <p>Error: {moviesList.error}</p>;

  return (
    <div className="home container mx-auto px-4 py-8">
      <Section
        data={moviesList.nowPlaying}
        filter="Now Playing"
        headText="Movies"
      />
      <Section data={moviesList.popular} filter="Popular" headText="Movies" />
      <Section data={serieslist.popular} filter="Popular" headText="Series" />
      <Section
        data={serieslist.topRated}
        filter="Top Rating"
        headText="Series"
      />
    </div>
  );
}

export default Home;
