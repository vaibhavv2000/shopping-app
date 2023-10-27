import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {View, Text, FlatList, Image} from "react-native";
import {product} from "../Redux/Slices/productSlice";
import {useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {TouchableOpacity} from "react-native";
import Filter from "../Components/ProductList/Filter";

const ProductList = (): JSX.Element => {
	const [products, setProducts] = useState<product[]>([]);
	const [title, setTitle] = useState<string>("");
	const [list, setList] = useState<product[]>([]);
   
	const [rating, setRating] = useState<number>(0);
	const [order, setOrder] = useState<string>("");
	const [showFilter, setShowFilter] = useState<boolean>(false);
   
	const navigation = useNavigation();
	const {type} = useRoute().params as {type: string};
   
	const allProducts = useSelector((state: RootState) => state.product.products);
   
	const {isDarkMode} = useSelector((state: RootState) => state.auth);
   
	useEffect(() => {
	 const filter = [...allProducts].filter((p) => p.type === type);
   
	 setProducts(filter);
	 setList(filter);
	}, [allProducts, type]);
   
	useEffect(() => {
	 if (type === "watch") setTitle("Watches For you");
	 if (type === "clothes") setTitle("Clothes");
	 if (type === "mobile") setTitle("Mobiles For you");
	}, [type]);
   
	useEffect(() => {
	 if (order === "Ascending") {
	  setProducts((p) => [...p.sort((a, b) => a.price - b.price)]);
	 };
	 if (order === "Descending") {
	  setProducts((p) => [...p.sort((a, b) => b.price - a.price)]);
	 };
	}, [order]);
   
	useEffect(() => {
	 const filter = [...list].filter((p) => p.rating >= rating);
	 setProducts(filter);
	}, [rating, list]);
   
 return (
  <View className='bg-white flex-1'>
  {showFilter && (
   <Filter
    order={order}
    rating={rating}
    setOrder={setOrder}
    setRating={setRating}
    setShowFilter={setShowFilter}
   />
  )}
   <View>
	<FlatList
	 data={products}
	 extraData={allProducts}
	 keyExtractor={(item, index) => String(index)}
	 ListHeaderComponent={
	  <View className='flex-row items-center justify-between pr-4'>
	   <Text className='dark:text-white/90 text-xl font-inter_600 p-1 pl-2 text-black/80'>
		 {title}
	   </Text>
	   <Fontisto
		 name='filter'
		 color={"#777"}
		 size={18}
		 onPress={() => setShowFilter(true)}
	   />
	  </View>
	 }
	 renderItem={({item, index}) => (
	  <TouchableOpacity
	   activeOpacity={0.8}
	   onPress={() => {
		// @ts-ignore
		navigation.navigate("SingleProduct", {id: item.id});
	   }}
	   className={`flex-1 ${index % 2 && "border-l border-gray-100"} border-b border-gray-100 flex-row items-start`}>
	    <View className='p-2'>
		 <Image
		  source={{uri: item.image}}
		  className='h-40 w-32 rounded-md'
		  resizeMode='contain'
		 />
	    </View>
		<View className='py-1 flex-1 pr-2'>
		 <View className='items-center justify-between flex-row'>
		  <Text className='font-inter_600'>{item.product_name}</Text>
		 </View>
		 <Text className='font-inter_400 text-black/60'>
		  {item.description.slice(0, 100)}...
		 </Text>
		 <View className='mt-1 flex-row items-center space-x-2'>
		  <Fontisto name='star' color={"#FFA900"} size={18} />
		  <Text className='font-inter_500 text-[12px]'>
			{item.rating}
		  </Text>
		 </View>
		 <View className='my-2 flex-row items-center space-x-2'>
		  <Ionicons name='pricetag' size={20} color={"limegreen"} />
		  <Text className='font-inter_500 text-[12px]'>
			{item.price}
		  </Text>
		 </View>
		 <View className='flex-row'>
		  <View className='rounded-full bg-slate-100 p-1 px-2'>
		   <Text className='font-inter_600 text-[12px] text-gray-400'>
			{item.type}
		   </Text>
		  </View>
		 </View>
		</View>
	   </TouchableOpacity>
	  )}
	 />
	</View>
   </View>
  );
};

export default ProductList;
