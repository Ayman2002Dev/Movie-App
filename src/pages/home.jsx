import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, lazy } from "react";
import {
  popularMovies,
  nowPlayingMovies,
  topRatedMovies,
} from "../store/Slices/MovieSlice";
import Loading from "../components/Loading";
import Section from "../components/Section";
import SectionFixed from "../components/SectionFixed";
import Pagination from "../components/Pagination";
const Movie = lazy(() => import("../components/Movie"));

function Home() {
  const moviesList = useSelector((state) => state.movies);

  const currentPage = useSelector((state) => state.pagination.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(popularMovies(currentPage));
    dispatch(nowPlayingMovies(currentPage));
    dispatch(topRatedMovies(currentPage));
    document.title = "Cinema Scope | Home";
  }, [dispatch, currentPage]);

  moviesList?.popular?.data.map((movie) => {
    return (
      <Suspense key={movie.id} fallback={<Loading />}>
        <Movie title={movie.title} poster={movie.poster_path} />
      </Suspense>
    );
  });

  if (
    moviesList.popular.loading ||
    moviesList.topRated.loading ||
    moviesList.nowPlaying.loading ||
    moviesList.popular.data.length === 0 ||
    moviesList.topRated.data.length === 0 ||
    moviesList.nowPlaying.data.length === 0 ||
    !moviesList
  ) {
    return <Loading />;
  }

  return (
    <div className="home container mx-auto px-4 py-8">
      <Section data={moviesList.nowPlaying.data} category="Now Playing" />
      {/* Popular Movies */}
      <SectionFixed category="Popular" data={moviesList.popular.data} />
      <Section
        data={moviesList.popular.data}
        category="Popular"
        toggle="true"
      />

      {/* Top Rated Movies */}
      <SectionFixed category="Top Rated" data={moviesList.topRated.data} />
      <Section
        data={moviesList.topRated.data}
        category="Top Rated"
        toggle="true"
      />
      <Pagination />
    </div>
  );
}

export default Home;
