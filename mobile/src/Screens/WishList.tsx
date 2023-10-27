import {View,Text,ImageBackground,ScrollView} from "react-native";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../Redux/store";
import NotAuth from "../Components/custom/NotAuth";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {removeFromWishlist} from "../Redux/Slices/userSlice";
import {API} from "../utils/API";
import {useNavigation} from "@react-navigation/native";

const WishList = (): JSX.Element => {
  const {wishlist} = useSelector((state: RootState) => state.user);
  const {isAuth,user,isDarkMode} = useSelector((state: RootState) => state.auth);

  const navigation = useNavigation();

  const dispatch: AppDispatch = useDispatch();

  if(!isAuth) return <NotAuth />;

  if(wishlist.length < 1) return <NotAuth title="Wishlist Empty" />;

  const removeFromWish = async (id: number) => {
    dispatch(removeFromWishlist((id)));
    await API.post("/product/removefromwishlist",{
      userId: user.id,
      productId: id,
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
      <View className="flex-1 bg-white flex-row flex-wrap p-2">
        {wishlist.map((p,index) => (
          <View
            className={`w-[50%] border-b-0.5 border-gray-200 ${index % 2 === 0 && "border-r-0.5 border-gray-200"
              }`}
            key={String(p.id + Math.random())}
          >
            <ImageBackground
              source={{uri: p.image}}
              className="w-full h-32 p-2 items-end mt-2"
              resizeMode="contain"
            >
              <Ionicons
                name="heart"
                size={25}
                color={"red"}
                onPress={() => removeFromWish(p.id)}
              />
            </ImageBackground>
            <View className="p-2">
              <Text className="font-inter_600 text-[16px] text-black/90"
              // @ts-ignore
                onPress={() => navigation.navigate("SingleProduct", {id: p.id})}
              >
                {p.product_name}...
              </Text>
              <View className="mt-1 flex-row items-center space-x-2">
                <Text className='font-inter_400 text-black/60'>
								{p.description.slice(0,50)}...
							 </Text>
              </View>
              <View className="mt-1 flex-row items-center space-x-2">
                <Fontisto name="star" color={"#FFA900"} size={18} />
                <Text className="font-inter_500 text-[12px]">{p.rating}</Text>
              </View>
              <View className="my-2 flex-row items-center space-x-2">
                <Ionicons name="pricetag" size={20} color={"limegreen"} />
                <Text className="font-inter_500 text-[12px]">{p.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WishList;
