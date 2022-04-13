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
import { Getdata, Setdata } from "./Signupscreen";

export default function (props) {
  const [name, setName] = useState("naxxs");
  const [mobile, setMobile] = useState("");
  const [Mypass, setMypass] = useState("");
  const mystatus = useContext(Mycontext);
  // console.log(mystatus.Username._W);
  const Handlerlogin = () => {
    mystatus.setStorepass(Getdata(mobile));

    console.log(mystatus.Storepass);

    if (Mypass === mystatus.Storepass._W) {
      Alert.alert("Амжилттай нэвтэрлээ");
      mystatus.setisLoggedIn(true);
      props.navigation.navigate("Home");
    } else {
      Alert.alert("Утас эсхүл нууц үг буруу байна");
      mystatus.setisLoggedIn(false);
    }
  };
  return (
    <View>
      <Image
        style={{
          width: "100%",
          height: "20%",
          justifyContent: "center",
          resizeMode: "stretch",
        }}
        source={require("../../assets/log.jpg")}
      />
      <Text style={{ textAlign: "center", fontSize: 16 }}>
        Хэрэглэгчийн нэр, нууц
      </Text>
      <TextInput
        keyboardType="numeric"
        style={css.input}
        placeholder="Утсаа оруулна rrrrуу"
        onChangeText={setMobile}
      />
      <Text style={{ textAlign: "center", fontSize: 14 }}>
        Хэрэглэгч: {setName}
      </Text>
      <TextInput
        secureTextEntry={true}
        style={css.input}
        placeholder="Нууц үгээ оруулна уу"
        onChangeText={setMypass}
      />
      <View style={css.Button}>
        <Button onPress={Handlerlogin} title="Нэвтрэх" />
      </View>
      <View style={css.Button}>
        <Button
          onPress={() => props.navigation.navigate("SignUp")}
          title="Бүртгүүлэх"
        />
      </View>
      <View style={css.Button}>
        <Button onPress={() => Getdata("86163023name")} title="Get" />
      </View>
      <View style={css.Button}>
        <Button onPress={() => Setdata("nn", "nnutga")} title="Set" />
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
