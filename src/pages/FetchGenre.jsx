import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGenerMoviesByPage,
  fetchGeners,
} from "../store/Slices/GenerSlice";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import SectionFixedFull from "../components/SectionFixedFull";
import NotFound from "./NotFound";

function FetchGenre() {
  const { genreName } = useParams();
  const dispatch = useDispatch();
  const { genresList } = useSelector((state) => state.genre);
  const { currentPage } = useSelector((state) => state.pagination);
  const { genres } = useSelector((state) => state.genre);
  const { genreByPage } = useSelector((state) => state.genre);

  const genreId = genresList?.data?.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase()
  );

  const genreData = genres[genreId?.id];

  if (!genreData) {
    return <NotFound />;
  }

  useEffect(() => {
    dispatch(fetchGeners());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGenerMoviesByPage({ currentPage, genreId: genreId?.id }));
  }, [dispatch, genreId, currentPage]);

  if (genreByPage.loading) {
    return <Loading />;
  }
  return (
    <section className="genre-page">
      <SectionFixedFull data={genreByPage?.data} />
      <Pagination />
    </section>
  );
}

export default FetchGenre;
