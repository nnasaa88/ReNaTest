import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TextInput,
} from "react-native";
import SplashScreen from "./SplashScreen";
import Mycontext, { Mystore } from "../../context/Mycontext";
import { Getdata, Setdata } from "./Signupscreen";

export default function (props) {
  const [mobile, setMobile] = useState("");
  const [Mypass, setMypass] = useState("");
  const mystatus = useContext(Mycontext);
  let Userinfo = {};

  const Handlerlogin = async () => {
    const userstring = await AsyncStorage.getItem(mobile);

    if (userstring !== null) {
      Userinfo = JSON.parse(userstring);
      console.log(Userinfo);
    }

    mystatus.setStorepass(Userinfo.para3);
    mystatus.setStorename(Userinfo.para1);

    if (Mypass === mystatus.Storepass) {
      Alert.alert("Амжилттай нэвтэрлээ");
      mystatus.setisLoggedIn(true);
      props.navigation.navigate("Home");
      setMypass(null);
    } else {
      Alert.alert("Утас эсхүл нууц үг буруу байна");
      mystatus.setisLoggedIn(false);
      setMypass(null);
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
        placeholder="Утсаа оруулна уу"
        onChangeText={setMobile}
      />
      <Text style={{ textAlign: "center", fontSize: 14 }}>
        Хэрэглэгч: {mystatus.Storename}
      </Text>
      <TextInput
        secureTextEntry={false}
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
        <Button onPress={() => Getdata("86163023")} title="Get" />
      </View>
      <View style={css.Button}>
        <Button
          onPress={() => Setdata("86163023", "name", "email", "nnutga")}
          title="Set"
        />
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
