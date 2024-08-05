import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice"; // esm import
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    loaders: loaderReducer,
    users: userReducer,
  },
});

export default store;
