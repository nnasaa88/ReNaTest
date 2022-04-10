import React from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  HeaderBackButton,
} from "@react-navigation/native-stack";
import LoginScreen from "./scr/screens/Login";
import HomeScreen from "./scr/screens/Home";
import FlatScreen from "./scr/screens/Flatlistscreen";
import SignUpScreen from "./scr/screens/Signupscreen";
import { DrawerScreen } from "./scr/screens/DrawerNav";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={FlatScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Drawer" component={DrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mytext: { fontSize: 18, color: "red" },
});
