import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchMoviesWithOriginCountry } from "../store/Slices/MovieSlice";
import SectionSwiper from "../components/SectionSwiper";
import Loading from "../components/Loading";

export const countries = [
  { iso: "EG", lang: "ar", country: "Egypt" },
  { iso: "SA", lang: "ar", country: "Saudi Arabia" },
  { iso: "GB", lang: "en", country: "United Kingdom" },
  { iso: "US", lang: "en", country: "United States" },
  { iso: "ES", lang: "en", country: "Spain" },
  { iso: "DE", lang: "en", country: "Germany" },
];

function MoviesList() {
  const dispatch = useDispatch();
  const { moviesOriginCountry } = useSelector(
    (state) => state.movies,
    shallowEqual
  );

  useEffect(() => {
    countries.forEach((country) => {
      dispatch(
        fetchMoviesWithOriginCountry({
          originLanguage: country.lang,
          originCountry: country.iso,
        })
      );
    });

    document.title = "Movies";
  }, [dispatch]);
  console.log(moviesOriginCountry);

  return (
    <section className="movies-list-page">
      {Object.values(moviesOriginCountry).map((country) =>
        country.loading ? (
          <Loading key={country?.info?.iso} />
        ) : (
          <SectionSwiper
            key={country?.info?.iso}
            country={country?.info?.country}
            data={country?.data}
          />
        )
      )}
    </section>
  );
}

export default React.memo(MoviesList);
