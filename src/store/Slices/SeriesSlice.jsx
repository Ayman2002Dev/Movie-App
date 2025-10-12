import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const popularSeries = createAsyncThunk(
  "series/popularSeries",
  async (currentPage) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_POPULAR_SERIES}page=${currentPage}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response?.data || error.message);
    }
  }
);

export const topRatedSeries = createAsyncThunk(
  "series/topRatedSeries",
  async (currentPage) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TOP_RATED_SERIES}page=${currentPage}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response?.data || error.message);
    }
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    loading: false,
    error: null,
    popular: [],
    topRated: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Popular Series
      .addCase(popularSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(popularSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.results;
      })
      .addCase(popularSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      // Top Rated Series
      .addCase(topRatedSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topRatedSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.topRated = action.payload.results;
      })
      .addCase(topRatedSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default seriesSlice.reducer;
