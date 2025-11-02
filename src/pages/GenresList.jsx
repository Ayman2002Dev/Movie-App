import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchGenerMovies, fetchGeners } from "../store/Slices/GenerSlice";
import React, { useEffect } from "react";
import Loading from "../components/Loading";
import SectionSwiper from "../components/SectionSwiper";

function GenresList() {
  const dispatch = useDispatch();
  // Genres List
  const { genresList } = useSelector((state) => state.genre, shallowEqual);
  // Genres Data
  const { genres: genresData } = useSelector(
    (state) => state.genre,
    shallowEqual
  );
  console.log(genresList);
  console.log(genresData);
  const genres = Object.values(genresData).map((g) => {
    return g;
  });

  console.log(genresData);

  useEffect(() => {
    dispatch(fetchGeners()).then((res) => {
      if (res.payload?.genres) {
        const allGenres = res.payload.genres;

        const loadBatch = (start, end, delay) => {
          setTimeout(() => {
            const batch = allGenres.slice(start, end);
            batch.forEach((genre) => {
              dispatch(fetchGenerMovies(genre.id));
            });
          }, delay);
        };

        loadBatch(0, 5, 0);
        loadBatch(5, 10, 2000);
        loadBatch(10, 15, 4000);
        loadBatch(15, 19, 6000);
      }
      document.title = "Genres";
    });
  }, [dispatch]);

  Object.values(genresData).map((g) => {
    if (g.loading) {
      return <Loading />;
    }
  });

  return (
    <>
      <section className="genre-page container mx-auto px-5 mb-5">
        {genres &&
          genres.map((genre) => {
            return (
              <SectionSwiper name={genre?.info?.name} data={genre?.data} />
            );
          })}
      </section>
    </>
  );
}

export default React.memo(GenresList);
