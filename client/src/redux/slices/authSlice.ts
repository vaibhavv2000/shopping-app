"use client";

import {PayloadAction,createSlice} from "@reduxjs/toolkit";

type user = {
  id: number | null;
  name: string;
  email: string;
};

interface state {
  user: user;
  isAuth: boolean;
  showAuth: boolean;
  isNavOpen: boolean;
  isDarkMode: boolean;
};

const initialState: state = {
  user: {
   id: null,
   name: "",
   email: "",
  },
  isDarkMode: false,
  isAuth: false,
  isNavOpen: false,
  showAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   login: (state,action: PayloadAction<user>) => {
    state.user = action.payload;
    state.isAuth = true;
   },
   logout: (state) => {
    state.user = {name: "",email: "",id: null};
    state.isAuth = false;
   },
    toggleDarkMode: (state, action: PayloadAction<"yes" | "no" | null>) => {
     const isDM = action.payload;

     if(isDM === "yes") state.isDarkMode = true;
     else if(isDM === "no") state.isDarkMode = false;
     else state.isDarkMode = !state.isDarkMode;
   },
    toggleNav: (state) => {
     state.isNavOpen = !state.isNavOpen;
   },
    toggleShowAuth: (state,action: PayloadAction<boolean>) => {
     state.showAuth = action.payload;
   },
  }
});

export const {
    login,
    logout,
    toggleDarkMode,
    toggleNav,
    toggleShowAuth,
} = authSlice.actions;

export default authSlice.reducer;