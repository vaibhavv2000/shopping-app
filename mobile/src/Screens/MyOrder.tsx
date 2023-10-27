import {useState,useEffect} from "react";
import {View,Text,TouchableOpacity,Image,ScrollView} from "react-native";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../Redux/store";
import NotAuth from "../Components/custom/NotAuth";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {removeFromBag,changeQuantity,addToHistory,emptyBag} from "../Redux/Slices/userSlice";
import {API} from "../utils/API";
import {useNavigation} from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";

const MyOrders = (): JSX.Element => {
	const [totalPrice,setTotalPrice] = useState<number>(0);
	const {my_orders} = useSelector((state: RootState) => state.user);
	const {isAuth,user,isDarkMode} = useSelector((state: RootState) => state.auth);

	const dispatch: AppDispatch = useDispatch();

	const navigation = useNavigation();

	const removeFromOrder = async (id: number) => {
		dispatch(removeFromBag((id)));
		await API.post("/product/removefromorder",{
			userId: user.id,
			productId: id,
			del: true,
		});
	};

	useEffect(() => {
		let total = 0;

		for(let i of my_orders) {
			const p = i.quantity * i.price;
			total += p;
		};

		setTotalPrice(total);
	},[my_orders]);

	const changeProductQuantity = async (id: number,opt: "incr" | "decr",pId: number) => {
		const data = {opt,id};

		try {
			if(opt === "incr") {
				dispatch(changeQuantity(data));
				await API.post("/product/addorder",{
					productId: id,
					userId: user.id,
					incr: true
				});
			};

			if(opt === "decr") {
				dispatch(changeQuantity(data));
				await API.post("/product/addorder",{
					productId: id,
					userId: user.id,
					decr: true
				});
			};
		} catch(error) {
			console.log(error);
		};
	};

	const checkout = async () => {
		try {
			const res = await API.post("/product/confirmorder",{userId: user.id});
			const data = await res.data;
			dispatch(addToHistory(my_orders));
			dispatch(emptyBag());
			setTotalPrice(0);
		} catch(error) {
			console.log(error);
		};
	};

	if(!isAuth) return <NotAuth />;

	if(my_orders.length < 1) return <NotAuth title='Empty Bag' />;

	return (
		<View className='flex-1 bg-white py-2'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='flex-1 bg-white'>
				{my_orders.map((item,index) => (
					<TouchableOpacity
						activeOpacity={0.8}
						key={String(`pro${Math.random()}`)}
						className={`flex-1 ${index % 2 && "border-l border-gray-100"} border-b border-gray-100 flex-row items-start`}>
						<TouchableOpacity
							className='p-2'
							onPress={() =>
								// @ts-ignore
								navigation.navigate("SingleProduct",{id: item.id})
							}>
							<Image
								source={{uri: item.image}}
								className='h-40 w-32 rounded-md'
								resizeMode='contain'
							/>
						</TouchableOpacity>
						<View className='py-1 flex-1 pr-2'>
							<View className='items-center justify-between flex-row'>
								<Text className='font-inter_600'>{item.product_name}</Text>
							</View>
							<Text className='font-inter_400 text-black/60'>
								{item.description.slice(0,50)}...
							</Text>
							<View className='mt-1 flex-row items-center space-x-2'>
								<Fontisto name='star' color={"#9b77f0"} size={18} />
								<Text className='font-inter_600 text-[12px]'>
									{item.rating}
								</Text>
							</View>
							<View className='my-2 flex-row items-center space-x-2'>
								<Ionicons name='pricetag' size={20} color={"limegreen"} />
								<Text className='font-inter_600 text-[12px]'>{item.price}</Text>
							</View>
							<View className='flex-row items-center space-x-2 py-2'>
								<TouchableOpacity className='h-7 w-7 bg-black justify-center  items-center'>
									<Entypo
										name='minus'
										size={24}
										color={"#fff"}
										onPress={() => changeProductQuantity(item.id,"decr",item)}
									/>
								</TouchableOpacity>
								<Text>{item?.quantity}</Text>
								<TouchableOpacity className='h-7 w-7 bg-black justify-center  items-center'>
									<Entypo
										name='plus'
										size={22}
										color={"#fff"}
										onPress={() => changeProductQuantity(item.id,"incr",item)}
									/>
								</TouchableOpacity>
							</View>
							<View className='flex-row justify-end pt-2'>
								<TouchableOpacity
									className='rounded-md bg-blue-500 p-2'
									onPress={() => removeFromOrder(item.id)}>
									<Text className='font-inter_600 text-white'>
										Remove From Orders
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
			<View className='flex-row bg-white items-center w-full p-1 absolute bottom-1 space-x-2'>
				<View>
					<Text className='font-inter_400 text-sm'>Total</Text>
					<Text className='font-inter_600 text-3xl'>{totalPrice}</Text>
				</View>
				<View className='flex-1'>
					<TouchableOpacity className='bg-black p-4 rounded-md' onPress={checkout}>
						<Text className='text-center text-white text-[18px] font-inter_700'>
							Checkout
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default MyOrders;
