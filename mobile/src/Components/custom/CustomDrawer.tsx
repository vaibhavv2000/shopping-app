import {DrawerContentScrollView} from "@react-navigation/drawer";
import {
	Text,
	View,
	TouchableOpacity,
	Pressable,
	useWindowDimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Redux/store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import {logout, toggleShowAuth} from "../../Redux/Slices/authSlice";
import * as SecureStore from "expo-secure-store";
import {useNavigation} from "@react-navigation/native";

var link = "flex-row items-center space-x-6 p-4 pl-3";
var holder = "h-6 w-6 justify-center items-center";
var text = "font-inter_500 text-[14px] text-black/80";

const CustomDrawer = (props: any) => {
 const {isAuth, user} = useSelector((state: RootState) => state.auth);

 const {height} = useWindowDimensions();

 const dispatch: AppDispatch = useDispatch();

 const navigation = useNavigation();

 return (
  <DrawerContentScrollView {...props} style={{flex: 1}}>
	{/* <DrawerItemList {...props} /> */}
	<View className='flex-1 -mt-10' style={{height: height - 32}}>
				<View
					className='bg-primary dark:bg-dark_2 p-2 pt-8 px-2 space-y-4'
					style={{backgroundColor: "rgb(82, 137, 192)"}}>
					<View className='flex-row justify-between items-start'>
						<MaterialIcons name='account-circle' color={"#fff"} size={65} />

						<TouchableOpacity className='h-10 w-10 rounded-full bg-white/10 justify-center items-center'>
							{true ? (
								<FontAwesome5 name='cloud-moon' color={"#fff"} size={22} />
							) : (
								<Ionicons name='ios-sunny' color={"#fff"} size={22} />
							)}
						</TouchableOpacity>
					</View>
					<Text className='font-inter_500 text-white text-lg pl-2'>
						Hello, {isAuth ? user.name : "Guest"}
					</Text>
				</View>
				<View className='flex-1 dark:bg-dark_2'>
					<Pressable
						className={link}
						android_ripple={{color: "#e7e4e4"}}
						onPress={() =>
							// @ts-ignore
							navigation.navigate("Home", {screen: "Feed"})
						}>
						<View className={holder}>
							<Foundation name='home' size={22} color={"#888"} />
						</View>
						<Text className={text}>Home</Text>
					</Pressable>
					<Pressable
						className={link}
						android_ripple={{color: "#e7e4e4"}}
						onPress={() =>
							// @ts-ignore
							navigation.navigate("Home", {screen: "Wishlist"})
						}>
						<View className={holder}>
							<Foundation name='heart' size={22} color={"#888"} />
						</View>
						<Text className={text}>Wishlist</Text>
					</Pressable>
					<Pressable
						className={link}
						android_ripple={{color: "#e7e4e4"}}
						onPress={() =>
							// @ts-ignore
							navigation.navigate("Home", {screen: "Orders"})
						}>
						<View className={holder}>
							<MaterialCommunityIcons name='cart' size={22} color={"#888"} />
						</View>
						<Text className={text}>My Orders</Text>
					</Pressable>
					<Pressable
						className={link}
						android_ripple={{color: "#e7e4e4"}}
						onPress={() =>
							// @ts-ignore
							navigation.navigate("Home", {screen: "OrderHistory"})
						}>
						<View className={holder}>
							<MaterialIcons name='watch-later' size={22} color={"#888"} />
						</View>
						<Text className={text}>History</Text>
					</Pressable>
					<Pressable className={link} android_ripple={{color: "#e7e4e4"}}>
						<View className={holder}>
							<MaterialCommunityIcons name='account' size={22} color={"#888"} />
						</View>
						<Text className={text}>My Account</Text>
					</Pressable>
					<Pressable className={link} android_ripple={{color: "#e7e4e4"}}>
						<View className={holder}>
							<Ionicons name='notifications' size={22} color={"#888"} />
						</View>
						<Text className={text}>Notifications</Text>
					</Pressable>
					<View className='w-full bg-gray-100 h-[1px]'></View>
					<Pressable className={link} android_ripple={{color: "#e7e4e4"}}>
						<View className={holder}>
							<MaterialIcons name='local-offer' size={22} color={"#888"} />
						</View>
						<Text className={text}>Offer</Text>
					</Pressable>
					<Pressable className={link} android_ripple={{color: "#e7e4e4"}}>
						<View className={holder}>
							<MaterialIcons name='shopping-bag' size={22} color={"#888"} />
						</View>
						<Text className={text}>Coupon</Text>
					</Pressable>
					{isAuth && (
						<Pressable
							className={link}
							android_ripple={{color: "#e7e4e4"}}
							onPress={async () => {
								await SecureStore.deleteItemAsync("shopping-user");
								dispatch(logout());
							}}>
							<View className={holder}>
								<MaterialIcons name='logout' size={22} color={"#888"} />
							</View>
							<Text className={text}>Logout</Text>
						</Pressable>
					)}
					{!isAuth && (
						<Pressable
							className={link}
							android_ripple={{color: "#e7e4e4"}}
							onPress={() => dispatch(toggleShowAuth(true))}>
							<View className={holder}>
								<FontAwesome5 name='sign-in-alt' size={22} color={"#888"} />
							</View>
							<Text className={text}>Sign In</Text>
						</Pressable>
					)}
				</View>
			</View>
		</DrawerContentScrollView>
	);
};

export default CustomDrawer;
