import React,{useEffect,useState} from "react";
import {View,Text,ScrollView} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {DrawerActions,useNavigation} from "@react-navigation/native";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../Redux/store";
import {addProducts,product} from "../Redux/Slices/productSlice";
import List from "../Components/Feed/List";
import SlideImages from "../Components/Feed/SlideImages";
import {API} from "../utils/API";

const Feed = (): JSX.Element => {
	const [randomProducts,setRandomProducts] = useState<product[]>([]);
	const [watches,setWatches] = useState<product[]>([]);
	const [mobiles,setMobiles] = useState<product[]>([]);
	const [clothes,setClothes] = useState<product[]>([]);

	const navigation = useNavigation()

	const {products} = useSelector((state: RootState) => state.product);
	const auth = useSelector((state: RootState) => state.auth);
	const {isDarkMode} = auth;

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		async function getProducts() {
			try {
				const res = await API.get("/product/fetchproducts");
				const data = await res.data;
				dispatch(addProducts(data));
			} catch(error) {
				console.log("error",error)
			}
		};

		getProducts();
	},[]);

	useEffect(() => {
		const list = [...products];
		const random = list.sort((a,b) => Math.random() - 0.5).slice(0,4);
		setRandomProducts(random);
	},[products]);

	useEffect(() => {
		const list = [...products];

		const pro = (type: "watch" | "clothes" | "mobile") => {
			return list
				.filter((m) => m.type === type).sort((a,b) => Math.random() - 0.5).slice(0,4);
		};

		const w = pro("watch");
		const c = pro("clothes");
		const m = pro("mobile");

		if(mobiles.length < 1) {
			setWatches(w);
			setClothes(c);
			setMobiles(m);
		};
	},[products]);

	const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

	return (
		<View className='bg-white flex-1'>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					className='bg-primary dark:bg-black p-2 py-3 flex-row justify-between'
					style={{backgroundColor: "rgb(82, 137, 192)"}}>
					<View className='flex-row items-center space-x-1'>
						<Octicons
							name='three-bars'
							size={26}
							color={"#fff"}
							onPress={openDrawer}
						/>
						<Text className='text-white font-inter_700 text-xl'>
							ShoppingCart
						</Text>
					</View>
					<FontAwesome5
						name='shopping-cart'
						color={"#fff"}
						size={24}
						onPress={() => {
							// @ts-ignore
							navigation.navigate("Home",{screen: "Orders"});
						}}
					/>
				</View>
				<SlideImages />
				<List
					title='Recommended For you'
					key={Math.random()}
					bg='bg-green-200'
					products={[...randomProducts]}
				/>
				<List
					title='Brand New Watches'
					key={Math.random()}
					bg='bg-red-200'
					products={watches}
				/>
				<List
					title='Clothes For you'
					key={Math.random()}
					bg='bg-white'
					products={clothes}
				/>
				<List
					title='Mobiles & Accessories'
					key={Math.random()}
					bg='bg-yellow-200'
					products={mobiles}
				/>
			</ScrollView>
		</View>
	);
};

export default Feed;
