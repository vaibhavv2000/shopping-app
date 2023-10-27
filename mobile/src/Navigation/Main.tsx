import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./Home";
import Products from "./Products";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import {store} from "../Redux/store";
import SingleProduct from "../Screens/SingleProduct";
import Auth from "../Components/custom/Auth";

const Stack = createNativeStackNavigator();

const client = new QueryClient();

const Main = (): JSX.Element => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={client}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{headerShown: false}}>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='Products' component={Products} />
						<Stack.Screen name='SingleProduct' component={SingleProduct} />
					</Stack.Navigator>
				</NavigationContainer>
			</QueryClientProvider>
			<Auth />
		</Provider>
	);
};

export default Main;
