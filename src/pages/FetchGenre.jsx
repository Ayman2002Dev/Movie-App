import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGenerMovies, fetchGeners } from "../store/Slices/GenerSlice";

function FetchGenre() {
  const { genreName } = useParams();
  const dispatch = useDispatch();
  const { genresList } = useSelector((state) => state.genre);
  const { genres } = useSelector((state) => state.genre);
  // const getGenre = Object.values(genres).filter((genre) => {
  //   return genre.info.name.toLowerCase() === genreName ? genre.data : "";
  // });
  const genreId = genresList.data.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase()
  );

  useEffect(() => {
    dispatch(fetchGeners());
    dispatch(fetchGenerMovies(genreId?.id));
  }, [genreName]);

  return <h1>FetchGenre</h1>;
}

export default FetchGenre;
