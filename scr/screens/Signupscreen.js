import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";

export default function ({ route, navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const signupHandler = () => {
    //Alert.alert("Нууц үгнүүд хооронdsfsdfdsfдоо таарахгүй байна!");
    setError(null);

    if (name.length === 0) {
      Alert.alert("Та нэрэээ бичнэ үү");
      return;
    }

    if (password1 !== password2) {
      Alert.alert("Нууц үгнүүд хоорондоо таарахгүй байна!");
      return;
    }
    if (Setdata(mobile, name, email, password1)) {
      // Setdata(mobile + "name", name);
      // Setdata(mobile + "email", email);
      Alert.alert("Амжилттай бүртгэлээ");
      return;
    } else {
      Alert.alert("Бүртгэхд алдаа гарлаа");
    }
  };
  return (
    <View>
      <Image
        style={{ width: "80%", height: "30%", resizeMode: "stretch" }}
        source={require("../../assets/log.jpg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray",
        }}
      >
        Шинэ хэрэглэгч
      </Text>

      {/* <Button title="Хадгалсан утга" onPress={getData} /> */}

      <TextInput
        style={css.inputField}
        askeyboardType="number-pad"
        placeholder="Нэр оруулна уу"
        onChangeText={setName}
      />
      <TextInput
        style={css.inputField}
        keyboardType="numeric"
        placeholder="Та утсаа оруулна уу"
        onChangeText={setMobile}
      />
      <TextInput
        style={css.inputField}
        askeyboardType="number-pad"
        placeholder="Та имэйл хаягаа оруулна уу"
        onChangeText={setEmail}
      />

      <TextInput
        style={css.inputField}
        secureTextEntry={true}
        placeholder="Нууц үгээ оруулна уу"
        onChangeText={setPassword1}
      />

      <TextInput
        style={css.inputField}
        secureTextEntry={true}
        placeholder="Нууц үгээ давтан оруулна уу"
        onChangeText={setPassword2}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button title="Буцах" onPress={() => navigation.goBack()} />
        <Button title="Бүртгэх toвч" onPress={signupHandler} />
      </View>
    </View>
  );
}
export const Setdata = async (para, para1, para2, para3, para4) => {
  AsyncStorage.setItem(para, JSON.stringify({ para1, para2, para3 }))
    .then((result) => {
      Alert.alert(para + "d Утга хадгалlaa");
      return true;
    })
    .catch((err) => {
      console.log("Токен хадгалж чадсангүй. Шалтгаан :" + err.message);
      setError("Токен хадгалж чадсангүй. Шалтгаан :" + err.message);
    });
};
export const Getdata = async (para) => {
  console.log(" from Getdata");
  await AsyncStorage.getItem(para)
    .then((data) => {
      if (data !== null) {
        const value = JSON.parse(data);
        // Alert.alert(para + "aar " + value + " utga olj irlee");
        console.log(value);
        return value;
      } else {
        // Alert.alert(para + "key-geer Utga oldsongui");
        return data;
      }
    })
    .catch((err) => Alert.alert(" Хайлт олдсонгүй " + err.message));
};
const css = StyleSheet.create({
  inputField: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    marginVertical: 5,
  },
});
