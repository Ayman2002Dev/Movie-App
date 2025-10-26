import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Slices/MovieSlice";
import paginationReducer from "./Slices/PaginaionSlice";
import fetchMovieReducer from "./Slices/fetchMovieSlice";
import genreReducer from "./Slices/GenerSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    fetchMovie: fetchMovieReducer,
    genre: genreReducer,
    pagination: paginationReducer,
  },
});
