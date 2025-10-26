import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Movie Details
export const fetchMovie = createAsyncThunk(
  "fetchMovie/fetchMovie",
  async (movieId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIE_DETAILS}/${movieId}`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
          },
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Trailer Video
export const trailerMovie = createAsyncThunk(
  "fetchMovie/trailerMovie",
  async (movieId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIE_DETAILS}/${movieId}/videos`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
          },
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

// Cast
export const castMovie = createAsyncThunk(
  "fetchMovie/castMovie",
  async (movieId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIE_CAST}/${movieId}/credits`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
          },
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

const fetchMovieSlice = createSlice({
  name: "fetchMovie",
  initialState: {
    movieData: { data: [], loading: false, error: null },
    credits: { data: { cast: [], crew: [] }, loading: false, error: null },
    trailer: { data: [], loading: false, error: null },
  },
  reducers: {
    clearCast: (state) => {
      state.credits.data.cast = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Movie Details
      .addCase(fetchMovie.pending, (state) => {
        state.movieData.loading = true;
        state.movieData.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movieData.loading = false;
        state.movieData.data = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.movieData.loading = false;
        state.movieData.error = action.payload || "Something went wrong";
      })
      // Trailer
      .addCase(trailerMovie.pending, (state) => {
        state.trailer.loading = true;
        state.trailer.error = null;
      })
      .addCase(trailerMovie.fulfilled, (state, action) => {
        state.trailer.loading = false;
        state.trailer.data = action.payload.results;
      })
      .addCase(trailerMovie.rejected, (state, action) => {
        state.trailer.loading = false;
        state.trailer.error = action.payload || "Something went wrong";
      })
      // Cast
      .addCase(castMovie.pending, (state) => {
        state.credits.loading = true;
        state.credits.error = null;
      })
      .addCase(castMovie.fulfilled, (state, action) => {
        state.credits.loading = false;
        state.credits.data.cast = action.payload.cast;
        state.credits.data.crew = action.payload.crew;
      })
      .addCase(castMovie.rejected, (state, action) => {
        state.credits.loading = false;
        state.credits.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearCast } = fetchMovieSlice.actions;
export default fetchMovieSlice.reducer;
