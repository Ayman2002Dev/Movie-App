import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const popularMovies = createAsyncThunk(
  "movies/popularMovies",
  async (currentPage) => {
    try {
      const totalPage = 500;
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIES_LISTS}page=${
          currentPage >= totalPage ? totalPage : currentPage
        }`
      );
      return res.data;
    } catch (error) {
      return new Error(error.response?.data || error.message);
    }
  }
);

export const nowPlayingMovies = createAsyncThunk(
  "movies/nowPlayingMovies",
  async (currentPage) => {
    try {
      const totalPage = 296;
      const res = await axios.get(
        `${import.meta.env.VITE_NOW_PLAYING}page=${
          currentPage >= totalPage ? totalPage : currentPage
        }`
      );
      return res.data;
    } catch (error) {
      return new Error(error.response?.data || error.message);
    }
  }
);

export const moviesSlice = createSlice({
  initialState: {
    error: null,
    popular: [],
    nowPlaying: [],
    loading: false,
  },
  name: "movies",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(popularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(popularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.results;
      })
      .addCase(popularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      // Now Playing Movies
      .addCase(nowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(nowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlaying = action.payload.results;
      })
      .addCase(nowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
