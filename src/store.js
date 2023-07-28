import { configureStore } from "@reduxjs/toolkit";
import addToCart from "./redux/reducers/reducer";

const store = configureStore({
  reducer: {
    addProduct: addToCart,
  },
});

export default store;


