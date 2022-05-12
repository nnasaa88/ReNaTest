import React, { useContext } from "react";
import { Text, View } from "react-native";
import Mycontext from "../../context/Mycontext";

export default function (props) {
  const mystatus = useContext(Mycontext);

  return (
    <View style={{ flex: 1 }}>
      <Text> Config </Text>
    </View>
  );
}
