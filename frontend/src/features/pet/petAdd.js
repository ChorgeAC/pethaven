import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    breeds: "",
    age: "",
    message: "",
    sex: "",
    height: "",
    weight: "",
    price: "",
    images: [],
  },
  isImagePageOpen: false,
  isLoading: false,
};

const petAddSlice = createSlice({
  name: "petAdd",
  initialState,
  reducers: {
    handleEventChange: (state, actions) => {
      state.formData[actions.payload.name] = actions.payload.value;
    },
    loadPetInfo: (state, actions) => {
      state.formData = { ...state.formData, ...actions.payload };
    },
    resetPetInfo: (state, actions) => {
      return initialState;
    },
    loadImagePage: (state, actions) => {
      return { ...state, isImagePageOpen: true };
    },
    closeImagePage: (state, actions) => {
      return { ...state, isImagePageOpen: false };
    },
    loadingOn: (state, actions) => {
      return { ...state, isLoading: true };
    },
    lodingOff: (state, actions) => {
      return { ...state, isLoading: false };
    },
  },
});

export const {
  handleEventChange,
  loadPetInfo,
  resetPetInfo,
  loadImagePage,
  closeImagePage,
  loadingOn,
  lodingOff,
} = petAddSlice.actions;

export default petAddSlice.reducer;
