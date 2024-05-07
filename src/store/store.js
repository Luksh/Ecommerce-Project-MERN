import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";

export const reduxStore = configureStore({
  reducer: { snackbar: snackbarReducer },
});

export default reduxStore;
