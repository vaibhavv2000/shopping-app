import authSlice from "./Slices/authSlice";
import productSlice from "./Slices/productSlice";
import userSlice from "./Slices/userSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
