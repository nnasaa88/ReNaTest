import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import HomeScreen from "./Home";
import { Flatlistscreen } from "../../database/Search";
import SignUpScreen from "./Signupscreen";
import SplashScreen from "./SplashScreen";
// import TestData from "../../database/exampledb";
import Searchdb from "../../database/Search";
import DetailScreen from "./Detail";
import EventScreen from "../../database/Event";
import ConfigScreen from "./Config";

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
        component={Flatlistscreen}
        options={{ title: "FlatList ээс" }}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} />

      <Stack.Screen name="Searchdb" component={Searchdb} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="Config" component={ConfigScreen} />
    </Stack.Navigator>
  );
};
