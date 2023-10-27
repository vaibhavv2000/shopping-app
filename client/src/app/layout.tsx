"use client";

import {Fragment, ReactNode, useEffect} from "react";
import "./globals.css";
import {Inter} from "next/font/google";
import {Metadata} from "next";
import {NextFont} from "next/dist/compiled/@next/font";
import StyledComponentsRegistry from "@/lib/registry";
import ReduxProvider from "@/redux/Provider";
import {AppDispatch, RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {login, toggleDarkMode} from "@/redux/slices/authSlice";
import {addDetails, setDataFetched} from "@/redux/slices/userSlice";
import {API} from "@/lib/API";

const inter: NextFont = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
 title: "Shopping",
 description: "One stop for everything",
};

function Child({children}: {children: ReactNode}) {
 const dispatch: AppDispatch = useDispatch();
	
 const {isDataFetched} = useSelector((state: RootState) => state.user);
 const auth = useSelector((state: RootState) => state.auth);
 const {isAuth, user} = auth;

 useEffect(() => {
  function checkAuth() {
   const user = localStorage.getItem("shopping-user");
   if (user) dispatch(login(JSON.parse(user)));
   const darkMode = localStorage.getItem("shopping-darkmode");
   if (darkMode) dispatch(toggleDarkMode("yes"));
  };

  checkAuth();
 }, []);

 useEffect(() => {
  async function fetchUserData() {
   const res = await API.get(`/product/getuserdata?id=${user.id}`);
   const data = await res.data;

   const order_history = data.historylist;
   const wishlist = data.wishlist;
   const my_orders = data.orderlist;

   dispatch(addDetails({order_history, wishlist, my_orders}));
 };

  if (isAuth && !isDataFetched) {
   fetchUserData();
   dispatch(setDataFetched());
  }
 }, [isAuth]);

 return <Fragment>{children}</Fragment>;
}

function RootLayout({children}: {children: ReactNode}) {
 return (
  <html lang='en'>
   <body className={inter.className}>
	<ReduxProvider>
	 <StyledComponentsRegistry>
	  <Child>{children}</Child>
	 </StyledComponentsRegistry>
	</ReduxProvider>
   </body>
  </html>
 );
};

export default RootLayout;