import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Popular
export const popularMovies = createAsyncThunk(
  "movies/popularMovies",
  async (currentPage, { rejectWithValue }) => {
    try {
      const totalPage = 300;
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIES_API}/popular`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
            page: currentPage >= totalPage ? totalPage : currentPage,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Now Playing
export const nowPlayingMovies = createAsyncThunk(
  "movies/nowPlayingMovies",
  async (currentPage, { rejectWithValue }) => {
    try {
      const totalPage = 300;
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIES_API}/now_playing`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
            page: currentPage >= totalPage ? totalPage : currentPage,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Top Rated
export const topRatedMovies = createAsyncThunk(
  "movies/topRatedMovies",
  async (currentPage, { rejectWithValue }) => {
    try {
      const totalPage = 296;
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIES_API}/top_rated`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
            page: currentPage >= totalPage ? totalPage : currentPage,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch category
export const fetchCategoryMovies = createAsyncThunk(
  "movies/fetchCategoryMovies",
  async ({ category, currentPage }, { rejectWithValue }) => {
    try {
      const totalPage = 296;
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIES_API}/${category}`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
            page: currentPage >= totalPage ? totalPage : currentPage,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// fetch Movies By Genere
// export const fetchMoviesByGenre = createAsyncThunk(
//   "movies/fetchMoviesByGenre",
//   async (genreId) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_MOVIE_Details}${movieId}`,
//         {
//           params: {
//             api_key: import.meta.env.VITE_API_KEY,
//             language: "en-US",
//           },
//         }
//       );
//       const data = await res.data;
//       return data;
//     } catch (error) {
//       console.error(
//         "Error fetching data:",
//         error.response?.data || error.message
//       );
//       throw error;
//     }
//   }
// );

export const moviesSlice = createSlice({
  initialState: {
    popular: { data: [], error: null, loading: false },
    nowPlaying: { data: [], error: null, loading: false },
    topRated: { data: [], error: null, loading: false },
    fetchCategory: { data: [], error: null, loading: false },
  },
  name: "movies",
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(popularMovies.pending, (state) => {
        state.popular.loading = true;
        state.popular.error = null;
      })
      .addCase(popularMovies.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.data = action.payload.results;
      })
      .addCase(popularMovies.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.payload || "Something went wrong";
      })
      // Now Playing Movies
      .addCase(nowPlayingMovies.pending, (state) => {
        state.nowPlaying.loading = true;
        state.nowPlaying.error = null;
      })
      .addCase(nowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying.loading = false;
        state.nowPlaying.data = action.payload.results;
      })
      .addCase(nowPlayingMovies.rejected, (state, action) => {
        state.nowPlaying.loading = false;
        state.nowPlaying.error = action.payload || "Something went wrong";
      })
      // Now Playing Movies
      .addCase(topRatedMovies.pending, (state) => {
        state.topRated.loading = true;
        state.topRated.error = null;
      })
      .addCase(topRatedMovies.fulfilled, (state, action) => {
        state.topRated.loading = false;
        state.topRated.data = action.payload.results;
      })
      .addCase(topRatedMovies.rejected, (state, action) => {
        state.topRated.loading = false;
        state.topRated.error = action.payload || "Something went wrong";
      })
      // Fetch Category
      .addCase(fetchCategoryMovies.pending, (state) => {
        state.fetchCategory.loading = true;
        state.fetchCategory.error = null;
      })
      .addCase(fetchCategoryMovies.fulfilled, (state, action) => {
        state.fetchCategory.loading = false;
        state.fetchCategory.data = action.payload.results;
      })
      .addCase(fetchCategoryMovies.rejected, (state, action) => {
        state.fetchCategory.loading = false;
        state.fetchCategory.error = action.payload || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
