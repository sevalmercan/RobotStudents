import { configureStore } from "@reduxjs/toolkit";

import { productsReducer } from "./redux/reducer/reducer";

const store = configureStore({
  reducer: {
    productsReducer,
  },
});

export default store;
