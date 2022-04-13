import React from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import {createNativeStackNavigator, HeaderBackButton,} from "@react-navigation/native-stack";
import Stacknav from "./scr/screens/Stacknav";
// import Drawernav from "./scr/screens/DrawerNav";
import Mycontext from "./context/Mycontext";

export default function App() {
  return (
    <NavigationContainer>
      <Mycontext.Provider value="vdsfsdfsdf">
        <Stacknav />
      </Mycontext.Provider>
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
