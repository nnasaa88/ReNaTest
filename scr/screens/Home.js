import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import Drawernav from "./DrawerNav";

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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => props.navigation.navigate("Login")}
        title=" Нүүр"
      />
    </View>
  );
}
