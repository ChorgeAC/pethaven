import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  pet_loading: false,
  pet_error: false,
  pet: [],
  featured_pet: [],
  singlePetLoading: false,
  singlePetError: false,
  singlePet: {},
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    getAllPets: (state, action) => {
      state.pet = action.payload;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
  },
});

export const { getAllPets, closeSidebar, openSidebar } = petSlice.actions;

export default petSlice.reducer;
