import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  userLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);
    },
    logoutUser: (state) => {
      window.localStorage.removeItem("token");
      window.location.href = "/";
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
