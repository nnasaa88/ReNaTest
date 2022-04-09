import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function (props) {
  /*useLayoutEffect(()=>{props.navigation.setOptions(headerRight: ()=>(< Feather style {{height:30} name="menu" color="white"}/> ));}, [props.navigation]);*/

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
