import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fetchGenerMoviesByPage,
  fetchGeners,
} from "../store/Slices/GenerSlice";
import Pagination from "../components/Pagination";
import NotFound from "./NotFound";
import SectionFixedFull from "../components/SectionFixedFull";

function FetchGenre() {
  const { genreName } = useParams();
  const dispatch = useDispatch();
  const { genresList } = useSelector((state) => state.genre);
  const { genreByPage } = useSelector((state) => state.genre);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const genreId = genresList?.data?.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase(),
  );

  useEffect(() => {
    dispatch(fetchGeners());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGenerMoviesByPage({ currentPage, genreId: genreId?.id }));
  }, [dispatch, genreId, currentPage]);

  // if (!genreByPage?.data?.length) return <NotFound />;

  return (
    <section className="genre-page">
      <SectionFixedFull
        data={genreByPage?.data}
        loading={genreByPage?.loading}
      />
      <Pagination />
    </section>
  );
}

export default FetchGenre;
