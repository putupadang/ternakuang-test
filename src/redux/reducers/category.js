import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    insertCategoryData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { insertCategoryData } = categorySlice.actions;

export default categorySlice.reducer;
