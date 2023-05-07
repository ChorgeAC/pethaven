import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  breeds: "",
  age: "",
  message: "",
  sex: "",
  height: "",
  weight: "",
  price: "",
};

const petAddSlice = createSlice({
  name: "petAdd",
  initialState,
  reducers: {
    handleEventChange: (state, actions) => {
      state[actions.payload.name] = actions.payload.value;
    },
    loadPetInfo: (state, actions) => {
      return { ...state, ...actions.payload };
    },
    resetPetInfo: (state, actions) => {
      return initialState;
    },
  },
});

export const { handleEventChange, loadPetInfo, resetPetInfo } =
  petAddSlice.actions;

export default petAddSlice.reducer;
