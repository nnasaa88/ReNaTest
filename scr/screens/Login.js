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
import { getdb, resultdb, fdate } from "../../database/db";

export default function (props) {
  const [mobile, setMobile] = useState("");
  const [Mypass, setMypass] = useState("");
  const mystatus = useContext(Mycontext);
  // let Userinfo1 = {};

  const Handlerlogin = () => {
    if (Mypass === mystatus.Storepass) {
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
        onEndEditing={async () => {
          const userstring = await resultdb(
            "select * from users where mobile = ?",
            [mobile]
          );
          console.log(userstring.rows.length);
          if (userstring.rows.length !== 0) {
            mystatus.setUserinfo(userstring.rows.item(0));
            mystatus.setStorename(mystatus.Userinfo.name);
            mystatus.setStorepass(mystatus.Userinfo.pass);
          } else {
            Alert.alert("Хэрэглэгч олдсонгүй");
            mystatus.setStorename("Хэрэглэгч олдсонгүй");
            mystatus.setStorepass("sssssssssss");
          }

          // const userstring = await AsyncStorage.getItem(mobile);
          // if (userstring !== null) {
          //   Userinfo = JSON.parse(userstring);
          //   mystatus.setStorename(Userinfo.para1);
          //   mystatus.setStorepass(Userinfo.para3);
          // } else {
          //   Alert.alert("Хэрэглэгч олдсонгүй");
          //   mystatus.setStorename("");
          // }
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 14 }}>
        Хэрэглэгч: {mystatus.Storename}
      </Text>
      <TextInput
        clearTextOnFocus={true}
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
      <View style={css.Button} flexDirection="row" justifyContent="center">
        <Button onPress={() => Getdata("86163023")} title="Get" />
        <Button
          onPress={() => Setdata("86163023", "name", "email", "nnutga")}
          title="Set"
        />
      </View>
      <View style={css.Button}>
        <Button
          onPress={() => {
            getdb("select * from items", []);
          }}
          title="DB"
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
