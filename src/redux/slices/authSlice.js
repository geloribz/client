import { createSlice } from "@reduxjs/toolkit";

//this will save the state
const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");

  //JSON.parse - this will create an object from the string 'isAuth'
  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const initialState = {
  isAuth: userAuthFromLocalStorage,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true;
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;

export default authSlice.reducer;
