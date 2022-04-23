import React, { useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
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
  const horsetouch = () => {
    mystatus.setActivetype("horse");
    props.navigation.navigate("List");
  };
  const cattletouch = () => {
    mystatus.setActivetype("cattle");
    // props.navigation.navigate("Testdb");
  };
  const sheeptouch = () => {
    mystatus.setActivetype("Хонь");
    props.navigation.navigate("Searchdb");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5, flexDirection: "column" }}>
        <View style={css.container}>
          <TouchableOpacity
            style={css.button}
            activeOpacity={0.5}
            onPress={horsetouch}
          >
            <Image
              style={css.image}
              source={require("../../assets/horse.jpg")}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <Text style={css.text}> Даага </Text>
            <Text style={css.text}> Шүдлэн </Text>
            <Text style={css.text}> Хязаалан </Text>
            <Text style={css.text}> Соёлон </Text>
            <Text style={css.text}> Бүдүүн нас </Text>
          </View>
        </View>
        <View style={css.container}>
          <TouchableOpacity activeOpacity={0.5} onPress={cattletouch}>
            <Image
              style={css.image}
              source={require("../../assets/cattle.jpg")}
            />
          </TouchableOpacity>
          <Text style={css.text}> Үхэр сүрэг </Text>
        </View>
        <View style={css.container}>
          <TouchableOpacity activeOpacity={0.5} onPress={sheeptouch}>
            <Image
              style={css.image}
              source={require("../../assets/sheep.jpg")}
            />
          </TouchableOpacity>
          <Text style={css.text}> Хонин сүрэг </Text>
        </View>
        <View style={css.container}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              style={css.image}
              source={require("../../assets/goat.jpg")}
            />
          </TouchableOpacity>
          <Text style={css.text}> Ямаан сүрэг </Text>
        </View>
      </View>
      {/* <View
        style={{
          height: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 50,
        }}
      >
        <Button
          onPress={() => props.navigation.navigate("List")}
          title="FlatList"
        />
        <Button
          onPress={() => props.navigation.navigate("Login")}
          title=" Буцах"
        />
      </View> */}
    </View>
  );
}
const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    // paddingVertical: 0,
  },
  button: {
    // alignItems: "center",
    // padding: 10,
  },
  image: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    resizeMode: "stretch",
  },
  text: {
    padding: 2,
    justifyContent: "center",
    fontSize: 14,
  },
});
