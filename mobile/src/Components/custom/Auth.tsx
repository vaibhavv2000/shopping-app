import {useEffect,useState} from "react";
import {
	Pressable,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
} from "react-native";
import {View,Text,Modal} from "react-native";
import PagerView from "react-native-pager-view";
import Feather from "react-native-vector-icons/Feather";
import {AppDispatch,RootState} from "../../Redux/store";
import {useDispatch,useSelector} from "react-redux";
import {API} from "../../utils/API";
import * as SecureStore from "expo-secure-store";
import {
	login as login_user,
	toggleShowAuth,
} from "../../Redux/Slices/authSlice";

var input = "p-3 border border-gray-300 w-full font-inter_400 rounded-sm";

const Auth = (): JSX.Element => {
	const [currentPage,setCurrentPage] = useState<number>(0);
	const [register,setRegister] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [login,setLogin] = useState({
		email: "",
		password: "",
	});
	const [loginError,setLoginError] = useState<string>("");
	const [registerError,setRegisterError] = useState<string>("");

	const {showAuth} = useSelector((state: RootState) => state.auth);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if(loginError) setTimeout(() => setLoginError(""),5000);
		if(registerError) setTimeout(() => setRegisterError(""),5000);
	},[loginError,registerError]);

	const handleSubmit = async () => {
		try {
			if(currentPage === 1) {
				const {email,name,password} = register;

				if(email && name && password) {
					const res = await API.post(`/auth/register`,register);
					await SecureStore.setItemAsync(
						"shopping-user",
						JSON.stringify(res.data.user)
					);

					dispatch(login_user(res.data.user));
					ToastAndroid.show("Registered in Successfully",ToastAndroid.LONG);
					setTimeout(() => {
						dispatch(toggleShowAuth(false));
					},2000);
				}
			} else {
				const {email,password} = login;

				if(email && password) {
					const res = await API.post(`/auth/login`,login);
					await SecureStore.setItemAsync(
						"shopping-user",
						JSON.stringify(res.data.user)
					);

					dispatch(login_user(res.data.user));
					ToastAndroid.show("Logged in Successfully",ToastAndroid.LONG);
					setTimeout(() => {
						dispatch(toggleShowAuth(false));
					},2000);
				}
			}
		} catch(error: any) {
			if(currentPage === 1) setRegisterError(error.response.data.error);
			else setLoginError(error.response.data.error);
		}
	};

	const handleLogin = (val: string,type: string) => {
		setLogin((p) => ({...p,[type]: val}));
	};

	const handleRegister = (val: string,type: string) => {
		setRegister((p) => ({...p,[type]: val}));
	};

	return (
		<Modal visible={showAuth} transparent animationType='slide'>
			<View className='flex-1' style={{backgroundColor: "rgba(0,0,0,0.1)"}}>
				<Pressable
					className='flex-1'
					onPress={() => dispatch(toggleShowAuth(false))}></Pressable>
				<View className='bg-white dark:bg-black rounded-tr-[30px] rounded-tl-[30px] p-2'>
					<View className='flex-row py-4'>
						<Text className='font-inter_600 text-lg pl-6 flex-1 text-black/70'>
							Please SignIn first
						</Text>
						<Feather
							name='x'
							size={28}
							color={"#777"}
							onPress={() => dispatch(toggleShowAuth(false))}
						/>
					</View>
					<View className='flex-row items-center relative'>
						<Text
							className={`flex-1 p-4 text-center font-inter_600 ${currentPage === 0 && "bg-gray-50"
								}`}>
							Login
						</Text>
						<Text
							className={`flex-1 p-4 text-center font-inter_600 ${currentPage === 1 && "bg-gray-50"
								}`}>
							Sign Up
						</Text>
						<View
							className={`absolute w-[50%] bottom-0 h-0.5`}
							style={{
								backgroundColor: "rgb(82, 137, 192)",
								left: currentPage === 0 ? "0%" : "50%",
							}}></View>
					</View>
					<PagerView
						className='h-80'
						initialPage={0}
						onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
						<View key='1'>
							<View className='w-[90%] mx-auto p-2 space-y-3 justify-center flex-1'>
								<TextInput
									className={input}
									cursorColor={"#999"}
									placeholder='Email'
									onChangeText={(text) => handleLogin(text,"email")}
								/>
								<TextInput
									className={input}
									cursorColor={"#999"}
									placeholder='Passsword'
									onChangeText={(text) => handleLogin(text,"password")}
									secureTextEntry
								/>
								{loginError && (
									<Text className='font-inter_500 text-red-500'>
										{loginError}
									</Text>
								)}
								<TouchableOpacity
									className='p-4 rounded-sm'
									style={{backgroundColor: "rgb(82, 137, 192)"}}
									onPress={handleSubmit}>
									<Text className='text-center text-white font-inter_600'>
										Login
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View key='2'>
							<View className='w-[90%] mx-auto p-2 space-y-3 justify-center flex-1'>
							    <TextInput
									className={input}
									cursorColor={"#999"}
									placeholder='Name'
									onChangeText={(text) => handleRegister(text,"name")}
								/>
								<TextInput
									className={input}
									cursorColor={"#999"}
									placeholder='Email'
									onChangeText={(text) => handleRegister(text,"email")}
								/>
								<TextInput
									className={input}
									cursorColor={"#999"}
									placeholder='Password'
									onChangeText={(text) => handleRegister(text,"password")}
									secureTextEntry
								/>
								{registerError && (
									<Text className='font-inter_500 text-red-500'>
										{registerError}
									</Text>
								)}
								<TouchableOpacity
									className='p-4 rounded-sm'
									style={{backgroundColor: "rgb(82, 137, 192)"}}
									onPress={handleSubmit}>
									<Text className='text-center text-white font-inter_600'>
										Sign up
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</PagerView>
				</View>
			</View>
		</Modal>
	);
};

export default Auth;
