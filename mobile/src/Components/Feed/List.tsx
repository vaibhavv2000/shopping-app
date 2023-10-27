import {memo} from "react";
import {Image, Platform} from "react-native";
import {View, Text} from "react-native";
import {product} from "../../Redux/Slices/productSlice";
import {Pressable} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

interface props {
	title: string;
	bg: string;
	products: product[];
}

function List(props: props) {
	const {title, bg, products} = props;
	const navigation = useNavigation();

	return (
		<View className={bg}>
			<View className={`p-2`}>
				<Text
					className={`text-xl font-inter_600 pl-5 text-black ${bg && "/50"}`}>
					{title}
				</Text>
				<View className='flex-wrap flex-row justify-center'>
					{products.map((p) =>
						Platform.OS === "android" ? (
							<Pressable
								key={String(`${title}${Math.random()}`)}
								android_ripple={{color: "rgba(0,0,0,0.07777)"}}
								onPress={() =>
                  // @ts-ignore
									navigation.navigate("Products",{type: p.type})
								}>
								<Image
									source={{uri: p.image}}
									className='h-40 w-40 m-1.5 rounded-md'
									resizeMode='contain'
								/>
							</Pressable>
						) : (
							<TouchableOpacity
								key={String(`${title}${Math.random()}`)}
								activeOpacity={0.8}
								onPress={() =>
                  // @ts-ignore
									navigation.navigate("Products",{type: p.type})
								}>
								<Image
									source={{uri: p.image}}
									className='h-40 w-40 m-1.5 rounded-md'
								/>
							</TouchableOpacity>
						)
					)}
				</View>
			</View>
		</View>
	);
}

export default memo(List);
