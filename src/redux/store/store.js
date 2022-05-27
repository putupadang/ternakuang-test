import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../reducers/news";
import categoryReducer from "../reducers/category";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    category: categoryReducer,
  },
});
