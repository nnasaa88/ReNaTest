import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TextInput,
} from "react-native";
import Mycontext, { Mystore } from "../../context/Mycontext";
import { getData } from "./Signupscreen";

export default function (props) {
  const [name, setName] = useState("naxxs");
  const [mobile, setMobile] = useState("");
  const [Mypass, setMypass] = useState("");
  const mystatus = useContext(Mycontext);
  console.log(mystatus.Username._W);

  return (
    <View>
      <Image
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          resizeMode: "stretch",
        }}
        source={require("../../assets/log.jpg")}
      />
      <Text style={{ textAlign: "center", fontSize: 16 }}>
        Хэрэглэгчийн нэр, нууц
      </Text>
      <TextInput
        value={mystatus.Username._W}
        autoCapitalize="words"
        style={css.input}
        placeholder="Нэр оруулна уу"
        onChangeText={setName}
      />
      <TextInput
        keyboardType="numeric"
        style={css.input}
        placeholder="Утсаа оруулна уу"
        onChangeText={setMobile}
      />
      <TextInput
        secureTextEntry={true}
        style={css.input}
        placeholder="Нууц үгээ оруулна уу"
        onChangeText={setMypass}
      />
      <View style={css.Button}>
        <Button
          onPress={() => props.navigation.navigate("Home")}
          title="Нэвтрэх"
        />
      </View>
      <View style={css.Button}>
        <Button
          onPress={() => props.navigation.navigate("SignUp")}
          title="Бүртгүүлэх"
        />
      </View>
      <View style={css.Button}>
        <Button onPress={() => getData("Userpass")} title="Буцах" />
      </View>
    </View>
  );
}
const css = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  Button: { marginVertical: 5, marginHorizontal: 50 },
});
