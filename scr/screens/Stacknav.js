import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import HomeScreen from "./Home";
import FlatScreen from "./Flatlistscreen";
import SignUpScreen from "./Signupscreen";
import SplashScreen from "./SplashScreen";
import Mycontext from "../../context/Mycontext";
// import DrawerScreen from "./DrawerNav";

const Stack = createStackNavigator();

export default () => {
  const mystatus = useContext(Mycontext);

  // if (mystatus.IsLoading === true) {
  //   return <SplashScreen />;
  // }
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: mystatus.Storename }}
      />
      <Stack.Screen
        name="List"
        component={FlatScreen}
        options={{ title: "Дэлгэрэнгүй" }}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
