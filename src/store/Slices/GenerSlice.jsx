import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Genres List
export const fetchGeners = createAsyncThunk(
  "genre/fetchGeners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(import.meta.env.VITE_GENRE_LIST, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Genres Movies
export const fetchGenerMovies = createAsyncThunk(
  "genre/fetchGenerMovies",
  async (genreId, { rejectWithValue }) => {
    try {
      const res = await axios.get(import.meta.env.VITE_GENRE_MOVIES, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          with_genres: genreId,
          language: "en-US",
          page: 1,
        },
      });
      return { id: genreId, results: res.data.results };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Genres Movies by Page
export const fetchGenerMoviesByPage = createAsyncThunk(
  "genre/fetchGenerMoviesByPage",
  async ({ currentPage, genreId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(import.meta.env.VITE_GENRE_MOVIES, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          with_genres: genreId,
          language: "en-US",
          page: currentPage,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const GenreSlice = createSlice({
  name: "genre",
  initialState: {
    genresList: { data: [], loading: false, error: null },
    genres: {},
    genreByPage: { data: [], error: null, loading: false },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Genre List
      .addCase(fetchGeners.pending, (state) => {
        state.genresList.loading = true;
        state.genresList.error = null;
      })
      .addCase(fetchGeners.fulfilled, (state, action) => {
        state.genresList.loading = false;
        state.genresList.data = action.payload?.genres || [];

        // Initialize genres map entries (preserve any existing per-genre data if present)
        (action.payload?.genres || []).forEach((g) => {
          state.genres[g.id] = state.genres[g.id] || {
            info: g,
            data: [],
            loading: false,
            error: null,
          };
          // keep info up-to-date
          state.genres[g.id].info = g;
        });
      })
      .addCase(fetchGeners.rejected, (state, action) => {
        state.genresList.loading = false;
        state.genresList.error = action.payload || "Something Went Wrong";
      })
      // Fetch Genre Movies
      .addCase(fetchGenerMovies.pending, (state, action) => {
        const genreId = action.meta.arg;
        state.genres[genreId] = {
          ...(state.genres[genreId] || { info: null, data: [] }),
          loading: true,
          error: null,
        };
      })
      .addCase(fetchGenerMovies.fulfilled, (state, action) => {
        const { id, results } = action.payload;
        state.genres[id] = {
          ...(state.genres[id] || { info: null }),
          data: results,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchGenerMovies.rejected, (state, action) => {
        const genreId = action.meta.arg;
        state.genres[genreId] = {
          ...(state.genres[genreId] || { info: null }),
          data: [],
          loading: false,
          error: action.payload || "Something Went Wrong",
        };
      })
      .addCase(fetchGenerMoviesByPage.pending, (state) => {
        state.genreByPage.loading = true;
        state.genreByPage.error = null;
      })
      .addCase(fetchGenerMoviesByPage.fulfilled, (state, action) => {
        state.genreByPage.loading = false;
        state.genreByPage.data = action.payload.results;
        state.genreByPage.error = null;
      })
      .addCase(fetchGenerMoviesByPage.rejected, (state, action) => {
        state.genreByPage.loading = false;
        state.genreByPage.error = action.payload || "Something Went Wrong";
      });
  },
});

export default GenreSlice.reducer;
