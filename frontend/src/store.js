import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./features/pet/petCart";
import filterReducer from "./features/filter/filter";

export const store = configureStore({
  reducer: {
    pet: petReducer,
    filter: filterReducer,
  },
});
