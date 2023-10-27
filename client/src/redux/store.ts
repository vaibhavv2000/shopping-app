"use client";

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
