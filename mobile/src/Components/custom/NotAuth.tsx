import React from "react";
import { View, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface props {
  title?: string
}

const NotAuth = (props: props): JSX.Element => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <FontAwesome5 name="shopping-bag" size={70} />
      <Text className="font-inter_500 text-2xl text-center my-3">
        {props.title ? props.title : "Not Logged In"}
      </Text>
    </View>
  );
};

export default NotAuth;
