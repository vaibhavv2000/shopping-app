"use client";

import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface userType {
  isDataFetched: boolean;
  wishlist: any[];
  my_orders: any[];
  order_history: any[];
}

const initialState: userType = {
  isDataFetched: false,
  wishlist: [],
  my_orders: [],
  order_history: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addDetails: (state,action) => {
      state.order_history = action.payload.order_history;
      state.wishlist = action.payload.wishlist;
      state.my_orders = action.payload.my_orders;
    },
    addToWishlist: (state,action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state,action) => {
      state.wishlist = state.wishlist.filter((p) => p.id !== action.payload);
    },
    addToBag: (state,action) => {
      state.my_orders.push(action.payload);
    },
    removeFromBag: (state,action) => {
      state.my_orders = state.my_orders.filter((p) => p.id !== action.payload);
    },
    changeQuantity: (state,action: PayloadAction<{opt: "incr" | "decr"; id: number;}>) => {
      const {opt, id} = action.payload;

      const pro = state.my_orders.find(p => p.id === id);
      const index = state.my_orders.indexOf(pro);

      if(opt === "incr") {
        state.my_orders[index].quantity += 1;
      };

      if(opt === "decr") {
        if(state.my_orders[index].quantity > 1) {
          state.my_orders[index].quantity -= 1;
        };
      };
    },
    emptyBag: (state) => {
      state.my_orders = [];
    },
    addToHistory: (state,action: PayloadAction<any[]>) => {
      state.order_history = [...state.order_history, ...action.payload];
    },
    setDataFetched: (state) => {
      state.isDataFetched = true;
    },
  },
});

export const {
  addDetails,
  addToWishlist,
  removeFromWishlist,
  addToBag,
  removeFromBag,
  emptyBag,
  addToHistory, 
  setDataFetched,
  changeQuantity
} = userSlice.actions;

export default userSlice.reducer;
