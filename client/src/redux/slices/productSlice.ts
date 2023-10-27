"use client";

import {PayloadAction,createSelector,createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface product {
  product_name: string;
  price: number;
  type: string;
  image: string;
  description: string;
  id: number;
  rating: number;
  quantity: number;
}

interface state {
  products: product[];
}

const initialState: state = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state,action: PayloadAction<product[]>) => {
      state.products = action.payload;
    },
  },
});

export const {addProducts} = productSlice.actions;

export default productSlice.reducer;

const selectSelf = (state: RootState) => state.product.products;
export const memoizedProducts = createSelector(selectSelf,(state: any) => [...state]);