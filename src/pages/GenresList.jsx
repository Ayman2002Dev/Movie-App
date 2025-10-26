import { useDispatch, useSelector } from "react-redux";
import { fetchGenerMovies, fetchGeners } from "../store/Slices/GenerSlice";
import { useEffect } from "react";
import Loading from "../components/Loading";
import SectionSwiper from "../components/SectionSwiper";

function GenresList() {
  const dispatch = useDispatch();
  // Genres List
  const { genresList } = useSelector((state) => state.genre);
  // Genres Data
  const { genres: genresData } = useSelector((state) => state.genre);
  console.log(genresList);
  console.log(genresData);
  const genres = Object.values(genresData).map((g) => {
    return g;
  });

  console.log(genres);

  useEffect(() => {
    dispatch(fetchGeners()).then((res) => {
      if (res.payload?.genres) {
        const allGenres = res.payload.genres;

        // دالة لتحميل دفعة محددة (Batch)
        const loadBatch = (start, end, delay) => {
          setTimeout(() => {
            const batch = allGenres.slice(start, end);
            batch.forEach((genre) => {
              dispatch(fetchGenerMovies(genre.id));
            });
          }, delay);
        };

        // تحميل على دفعات
        loadBatch(0, 5, 0); // أول 5 على طول
        loadBatch(5, 10, 2000); // بعد ثانيتين
        loadBatch(10, 15, 4000); // بعد 4 ثواني
        loadBatch(15, 19, 6000); // بعد 6 ثواني
      }
    });
  }, [dispatch]);

  console.log(genresList);

  // if (Object.values(genresData).some((genre) => genre.loading)) {
  //   return <Loading />;
  // }

  return (
    <>
      <section className="genre-page container mx-auto px-5 mb-5">
        {genres &&
          genres.map((genre) => {
            return <SectionSwiper name={genre.info.name} data={genre.data} />;
          })}
      </section>
    </>
  );
}

export default GenresList;
