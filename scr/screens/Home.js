import React, { useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import Drawernav from "./DrawerNav";
import Mycontext, { Mystore } from "../../context/Mycontext";

export default function (props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          size={30}
          style={{ marginRight: 20 }}
          name="menu"
          color="black"
          onPress={() => Drawernav()}
        />
      ),
    });
  }, [props.navigation]);

  const mystatus = useContext(Mycontext);
  console.log(mystatus.Username);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{"dfdsf" + mystatus.Username._W}</Text>
      <Text>Home Screen</Text>
      <Button
        onPress={() => props.navigation.navigate("Login")}
        title=" Нүүр"
      />
    </View>
  );
}
