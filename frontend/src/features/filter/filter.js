import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPets: [],
  allPets: [],
  gridView: true,
};

const fliterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setAllPet: (state, action) => {
      state.allPets = [...action.payload];
    },
    setGridView: (state) => {
      state.gridView = true;
    },
    setListView: (state) => {
      state.gridView = false;
    },
    loadFilterPets: (state) => {
      state.filteredPets = [...state.allPets];
    },
    updateFilter: (state, action) => {
      let tempPets = [...state.allPets];
      tempPets = tempPets.filter((item) =>
        action.payload.includes(item.breeds)
      );
      state.filteredPets = tempPets;
    },
  },
});

export const {
  setGridView,
  setListView,
  setAllPet,
  loadFilterPets,
  updateFilter,
} = fliterSlice.actions;

export default fliterSlice.reducer;
