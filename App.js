import React, { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import {createNativeStackNavigator, HeaderBackButton,} from "@react-navigation/native-stack";
import Stacknav from "./scr/screens/Stacknav";
// import Drawernav from "./scr/screens/DrawerNav";
import { Mystore } from "./context/Mycontext";
import { initdb } from "./database/db";

export default function App() {
  useEffect(() => {
    initdb()
      .then((result) => console.log("Бааз бэлдлээ"))
      .catch((err) => console.log("Бааз бэлдэхэд асуудал гарлаа."));
  }, []);

  return (
    <NavigationContainer>
      <Mystore>
        <Stacknav />
      </Mystore>
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
