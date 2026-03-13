import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "./MoviesList";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchMoviesCountry } from "../store/Slices/MovieSlice";
import SectionFixedFull from "../components/SectionFixedFull";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import NotFound from "./NotFound";

function FetchCountry() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const { fetchMovieCountry: MovieCountry } = useSelector(
    (state) => state.movies,
  );

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
      }),
    );
    document.title = `Country | ${countryList?.country}`;
  }, [countryName, currentPage]);

  // if (!MovieCountry?.data?.length) return <NotFound />;

  // if (!genreByPage?.data?.length) return <NotFound />;
  return (
    <section className="country-page">
      <SectionFixedFull
        data={MovieCountry?.data}
        loading={MovieCountry?.loading}
      />
      <Pagination totalPages={MovieCountry?.totalPages} />
    </section>
  );
}

export default FetchCountry;
