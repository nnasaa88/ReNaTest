import React, { useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Drawernav from "./DrawerNav";
import Mycontext, { Mystore } from "../../context/Mycontext";

export default function (props) {
  const mystatus = useContext(Mycontext);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          size={30}
          style={{ marginRight: 20 }}
          name="menu"
          color="black"
          onPress={() => {
            <NavigationContainer>
              <Drawernav />;
            </NavigationContainer>;
          }}
        />
      ),
    });
  }, [props.navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{"Хэрэглэгч   " + mystatus.Storename}</Text>
      <Text>{"dfdsf" + mystatus.isLoggedIn}</Text>
      <Text>Home Screen</Text>
      <Button
        onPress={() => props.navigation.navigate("Login")}
        title=" Нүүр"
      />
    </View>
  );
}
