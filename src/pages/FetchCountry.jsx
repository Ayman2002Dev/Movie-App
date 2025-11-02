import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "./moviesList";
import { useParams } from "react-router-dom";
import { fetchMoviesCountry } from "../store/Slices/MovieSlice";
import SectionFixedFull from "../components/SectionFixedFull";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

function FetchCountry() {
  const dispatch = useDispatch();
  const { fetchMovieCountry: MovieCountry } = useSelector(
    (state) => state.movies
  );

  const { currentPage } = useSelector((state) => state.pagination);
  const { countryName } = useParams();

  const countryList = countries.find((country) => {
    return (
      country.country.toLowerCase() ===
      countryName.replace("_", " ").toLowerCase()
    );
  });

  useEffect(() => {
    dispatch(
      fetchMoviesCountry({
        originLanguage: countryList?.lang,
        originCountry: countryList?.iso,
        currentPage,
      })
    );
    document.title = `Country | ${countryList?.country}`;
  }, [countryName, currentPage]);
  if (MovieCountry.loading) {
    return <Loading />;
  }
  return (
    <section className="country-page">
      <SectionFixedFull data={MovieCountry?.data} />
      <Pagination totalPages={MovieCountry?.totalPages} />
    </section>
  );
}

export default FetchCountry;
