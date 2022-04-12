import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import HomeScreen from "./Home";
import FlatScreen from "./Flatlistscreen";
import SignUpScreen from "./Signupscreen";
// import DrawerScreen from "./DrawerNav";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="List" component={FlatScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);
