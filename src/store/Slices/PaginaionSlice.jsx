import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: +sessionStorage.getItem("currentPage")
      ? +sessionStorage.getItem("currentPage")
      : 1,
  },
  reducers: {
    nextpage: (state, action) => {
      if (state.currentPage >= 500) {
        alert("You have reached the last page");
        return;
      }
      state.currentPage = action.payload + 1;
      sessionStorage.setItem("currentPage", state.currentPage);
    },
    previousPage: (state, action) => {
      if (state.currentPage <= 1) {
        alert("You have reached the first page");
        return;
      }
      state.currentPage = action.payload - 1;
      sessionStorage.setItem("currentPage", state.currentPage);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      sessionStorage.setItem("currentPage", state.currentPage);
    },
  },
});

export const { nextpage, previousPage, setPage } = paginationSlice.actions;
export default paginationSlice.reducer;
