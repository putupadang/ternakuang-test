import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isGetAll: true,
  categoryTemp: 0,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    insertNewsData: (state, action) => {
      state.data = action.payload;
    },
    handleGetAll: (state, action) => {
      state.isGetAll = action.payload;
    },
    handleCategoryTemp: (state, action) => {
      state.categoryTemp = action.payload;
    },
  },
});

export const { insertNewsData, handleGetAll, handleCategoryTemp } = newsSlice.actions;

export default newsSlice.reducer;
