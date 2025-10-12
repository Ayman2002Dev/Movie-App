import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Slices/MovieSlice";
import paginationReducer from "./Slices/PaginaionSlice";
import seriesReducer from "./Slices/SeriesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    series: seriesReducer,
    pagination: paginationReducer,
  },
});
