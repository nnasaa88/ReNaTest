import React from "react";
import { StyleSheet, Text, View } from "react-native";

// npm install @react-navigation/drawer
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// import Stacknav from "./Stacknav";

function ScreenA() {
  return (
    <View style={css.container}>
      <Text style={css.text}>Screen A</Text>
    </View>
  );
}
function ScreenB() {
  return (
    <View style={css.container}>
      <Text style={css.text}>Screen B</Text>
    </View>
  );
}
function ScreenC() {
  return (
    <View style={css.container}>
      <Text style={css.text}>Screen C</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default () => (
  <Drawer.Navigator initialRouteName="Screen A">
    <Drawer.Screen name="Screen A" component={ScreenA} />
    <Drawer.Screen name="Screen B" component={ScreenB} />
    <Drawer.Screen name="Screen C" component={ScreenC} />
  </Drawer.Navigator>
);
const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
