import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { countries } from "../../pages/moviesList";

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

// Fetch movies by origin country more than one
export const fetchMoviesWithOriginCountry = createAsyncThunk(
  "movies/fetchMoviesWithOriginCountry",
  async ({ originLanguage, originCountry }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MOVIE_ORIGIN_COUNTRY}`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            with_origin_language: originLanguage,
            with_origin_country: originCountry,
            sort_by: "release_date.desc",
            page: 1,
          },
        }
      );
      return { iso: originCountry, results: res.data.results };
    } catch (error) {
      return rejectWithValue({
        iso: originCountry,
        error: error.response?.data || error.message,
      });
    }
  }
);

// Fetch movie by origin country one only
export const fetchMoviesCountry = createAsyncThunk(
  "movies/fetchMoviesCountry",
  async (
    { originLanguage, originCountry, currentPage },
    { rejectWithValue }
  ) => {
    try {
      console.log(currentPage);

      const res = await axios.get(
        `${import.meta.env.VITE_MOVIE_ORIGIN_COUNTRY}`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            with_origin_language: originLanguage,
            with_origin_country: originCountry,
            sort_by: "release_date.desc",
            page: currentPage,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue({
        iso: originCountry,
        error: error.response?.data || error.message,
      });
    }
  }
);

export const moviesSlice = createSlice({
  initialState: {
    popular: { data: [], error: null, loading: false },
    nowPlaying: { data: [], error: null, loading: false },
    topRated: { data: [], error: null, loading: false },
    fetchCategory: { data: [], error: null, loading: false },
    moviesOriginCountry: {},
    fetchMovieCountry: {
      data: [],
      error: null,
      loading: false,
      totalPages: null,
    },
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
      })
      // Fetch movies with origin country more
      .addCase(fetchMoviesWithOriginCountry.pending, (state, action) => {
        const { originCountry: iso } = action.meta.arg;

        state.fetchMovieCountry[iso] = {
          ...(state.fetchMovieCountry[iso] || {
            info: null,
            data: [],
            loading: true,
            error: null,
          }),
        };
      })

      .addCase(fetchMoviesWithOriginCountry.fulfilled, (state, action) => {
        const information = countries.find((country) => {
          return country.iso === action.payload.iso;
        });
        state.moviesOriginCountry[action.payload.iso] = {
          info: information,
          data: action.payload.results,
          error: null,
          loading: false,
        };
      })
      .addCase(fetchMoviesWithOriginCountry.rejected, (state, action) => {
        const iso = action.payload?.iso || action.meta.arg;
        state.moviesOriginCountry[iso] = {
          data: [],
          error: action.payload?.error || "Unknown error",
          loading: false,
        };
      })
      // Fetch movies with origin country one only
      .addCase(fetchMoviesCountry.pending, (state) => {
        state.fetchMovieCountry.loading = true;
        state.fetchMovieCountry.error = null;
      })
      .addCase(fetchMoviesCountry.fulfilled, (state, action) => {
        state.fetchMovieCountry.loading = false;
        state.fetchMovieCountry.error = null;
        state.fetchMovieCountry.data = action.payload.results;
        state.fetchMovieCountry.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMoviesCountry.rejected, (state, action) => {
        state.fetchMovieCountry.loading = false;
        state.fetchMovieCountry.data = [];
        state.fetchMovieCountry.error =
          action.payload?.error || "Unknown error";
      });
  },
});

export default moviesSlice.reducer;
