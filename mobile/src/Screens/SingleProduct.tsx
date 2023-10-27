import {useRoute} from "@react-navigation/native";
import React from "react";
import {
	View,
	Text,
	Image,
	useWindowDimensions,
	ToastAndroid,
} from "react-native";
import {useState,useEffect} from "react";
import {product} from "../Redux/Slices/productSlice";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../Redux/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {TouchableOpacity} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {
	addToBag,
	addToWishlist,
	removeFromBag,
	removeFromWishlist,
} from "../Redux/Slices/userSlice";
import {API} from "../utils/API";
import {toggleShowAuth} from "../Redux/Slices/authSlice";

const SingleProduct = (): JSX.Element => {
	const [product,setProduct] = useState<product>();
	const [isWished,setIsWished] = useState<boolean>(false);
	const [isInCart,setIsInCart] = useState<boolean>(false);

	const {id} = useRoute().params as {id: number};
	const {width} = useWindowDimensions();

	const products = useSelector((state: RootState) => state.product.products);
	const {wishlist,my_orders} = useSelector((state: RootState) => state.user);
	const {isAuth,user,isDarkMode} = useSelector(
		(state: RootState) => state.auth
	);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		const p = products.find((p) => String(p.id) === String(id));
		setProduct(p);
	},[products,id]);

	useEffect(() => {
		const pro = wishlist.find((p) => String(p.id) === String(id));
		if(pro) setIsWished(true);
	},[wishlist,id]);

	useEffect(() => {
		const pro = my_orders.find((p) => String(p.id) === String(id));
		if(pro) setIsInCart(true);
	},[my_orders,id]);

	const addToCart = async (opt: string) => {
		console.log(isAuth)
		if(!isAuth) return dispatch(toggleShowAuth(true));

		if(opt === "add") {
			setIsInCart(true);
			dispatch(addToBag({...product,quantity: 1}));
			await API.post("/product/addorder",{
				userId: user.id,
				productId: id,
			});
		}

		if(opt === "remove") {
			setIsInCart(false);
			dispatch(removeFromBag(product?.id));
			await API.post("/product/removefromorder",{
				userId: user.id,
				productId: id,
				del: true,
			});
		}
	};

	const addToWish = async (opt: string) => {
		if(!isAuth) return dispatch(toggleShowAuth(true));

		if(opt === "add") {
			setIsWished(true);
			dispatch(addToWishlist(product));
			await API.post("/product/addtowishlist",{
				userId: user.id,
				productId: id,
			});
		}

		if(opt === "remove") {
			setIsWished(false);
			dispatch(removeFromWishlist(product?.id));
			await API.post("/product/removefromwishlist",{
				userId: user.id,
				productId: id,
			});
		}
	};

	return (
		<View className='flex-1 bg-white py-5'>
			<View style={{height: width}} className='p-5'>
				<Image
					source={{uri: product?.image}}
					className='h-full w-full'
					resizeMode='cover'
				/>
			</View>
			<View className='p-2'>
				<View className='flex-row items-center justify-between pr-5'>
					<Text className='text-xl font-inter_700'>
						{product?.product_name}
					</Text>
					{isWished ? (
						<Ionicons
							name='heart'
							size={25}
							color={"red"}
							onPress={() => addToWish("remove")}
						/>
					) : (
						<EvilIcons
							name='heart'
							size={32}
							color={"#777"}
							onPress={() => addToWish("add")}
						/>
					)}
				</View>
				<View className='mt-1 flex-row items-center space-x-2'>
					<Fontisto name='star' color={"#FFA900"} size={18} />
					<Text className='font-inter_400'>{product?.rating}</Text>
				</View>
				<View className='my-2 flex-row items-center space-x-2'>
					<Ionicons name='pricetag' size={20} color={"limegreen"} />
					<Text className='font-inter_400'>{product?.price}</Text>
				</View>
				<Text className='font-inter_500 text-black/60'>
					{product?.description}
				</Text>
			</View>
			<View className='absolute bottom-2 left-0 w-full'>
				<TouchableOpacity
					className='bg-black w-[90%] mx-auto rounded-md flex-row items-center p-3 justify-center space-x-4'
					activeOpacity={0.8}
					onPress={() => addToCart(isInCart ? "remove" : "add")}>
					<Feather name='shopping-bag' size={24} color={"#fff"} />
					<Text className='font-inter_600 text-lg text-white'>
						{isInCart ? "Remove From Bag" : "Add To Bag"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SingleProduct;