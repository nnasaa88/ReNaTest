import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
export default function (props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Нэврэх хуудас </Text>
      <Button
        onPress={() => props.navigation.navigate("Home")}
        title="Нэвтрэх"
      />
    </View>
  );
}
