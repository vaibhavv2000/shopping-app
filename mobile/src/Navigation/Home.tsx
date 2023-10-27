import {createDrawerNavigator} from "@react-navigation/drawer";
import Feed from "../Screens/Feed";
import MyOrder from "../Screens/MyOrder";
import CustomDrawer from "../Components/custom/CustomDrawer";
import {SafeAreaView} from "react-native-safe-area-context";
import {useQuery} from "@tanstack/react-query";
import {API} from "../utils/API";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Redux/store";
import {addProducts} from "../Redux/Slices/productSlice";
import {addDetails} from "../Redux/Slices/userSlice";
import WishList from "../Screens/WishList";
import OrderHistory from "../Screens/OrderHistory";

const Drawer = createDrawerNavigator();

const Home = (): JSX.Element => {
	const {user, isAuth} = useSelector((state: RootState) => state.auth);
	const dispatch: AppDispatch = useDispatch();

	const {refetch} = useQuery({
		queryKey: ["products"],
		queryFn: async () => await (await API.get("/product/fetchproducts")).data,
		onSuccess: (data) => dispatch(addProducts(data)),
		enabled: false,
	});

	useEffect(() => {
		// refetch();
	}, []);

	const {refetch: fetchUserData} = useQuery({
		queryKey: ["userdata"],
		queryFn: async () => await (await API.get(`/product/getuserdata?id=${user.id}`)).data,
		enabled: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		onSuccess: (data: any) => {
			const order_history = data.historylist;
			const wishlist = data.wishlist;
			const my_orders = data.orderlist;

			dispatch(addDetails({order_history, wishlist, my_orders}));
		},
	});

	useEffect(() => {
		// if (isAuth && !isDataFetched) {
		// 	fetchUserData();
		// 	dispatch(setDataFetched());
		// }
	}, [isAuth]);

	return (
		<SafeAreaView className='flex-1'>
			<Drawer.Navigator
				drawerContent={(props) => <CustomDrawer {...props} />}
				screenOptions={{
					headerShown: false,
					drawerStyle: {
						width: "80%",
					},
				}}>
				<Drawer.Screen name='Feed' component={Feed} />
				<Drawer.Screen name='Wishlist' component={WishList} />
				<Drawer.Screen name='OrderHistory' component={OrderHistory} />
				<Drawer.Screen name='Orders' component={MyOrder} />
			</Drawer.Navigator>
		</SafeAreaView>
	);
};

export default Home;
