import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./features/pet/petCart";
import filterReducer from "./features/filter/filter";
import authReducer from "./features/auth/auth";
import petAddReduce from "./features/pet/petAdd";

export const store = configureStore({
  reducer: {
    pet: petReducer,
    filter: filterReducer,
    auth: authReducer,
    petAdd: petAddReduce,
  },
});
