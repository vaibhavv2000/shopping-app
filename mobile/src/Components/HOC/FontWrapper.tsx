import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { ReactNode, Fragment, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {login, toggleDarkMode} from "../../Redux/Slices/authSlice";
import {API} from "../../utils/API";
import {addDetails, setDataFetched} from "../../Redux/Slices/userSlice";

const FontWrapper = ({ children }: { children: ReactNode }) => {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

 const dispatch: AppDispatch = useDispatch();
	
 const {isDataFetched} = useSelector((state: RootState) => state.user);
 const auth = useSelector((state: RootState) => state.auth);
 const {isAuth, user} = auth;

  useEffect(() => {
    async function checkAuth() {
     const user = await SecureStore.getItemAsync("shopping-user");
     if (user) dispatch(login(JSON.parse(user)));
     const darkMode = await SecureStore.getItemAsync("shopping-darkmode");
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

  if (!fontsLoaded) return <ActivityIndicator color={"purple"} />;

  return <Fragment>{children}</Fragment>;
};

export default FontWrapper;
