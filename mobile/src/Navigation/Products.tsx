import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductList from "../Screens/ProductList";
import { useRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const Products = (): JSX.Element => {
  const { type } = useRoute().params as { type: string };

  return (
    <SafeAreaView className="flex-1">
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { width: 0 },
          headerShown: false
        }}
      >
        <Drawer.Screen
          name="ProductList"
          component={ProductList}
          initialParams={{
            type,
          }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default Products;
