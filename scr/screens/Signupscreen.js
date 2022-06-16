import React, { useState } from "react";
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
import { CheckBox } from "react-native-elements";
import Mycontext, { fdate } from "../../context/Mycontext";
import { initdb, resultdb } from "../../database/db";

export default function ({ route, navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isadmin, setisadmin] = useState(false);
  const [error, setError] = useState(null);

  const signupHandler = async () => {
    setError(null);

    if (name.length === 0) {
      Alert.alert("Та нэрэээ бичнэ үү");
      return;
    }

    if (password1 !== password2) {
      Alert.alert("Нууц үгнүүд хоорондоо таарахгүй байна!");
      return;
    }
    await resultdb(
      "INSERT into config (ename, mname, value,value1,value2, value3, created) values (?,?,?,?,?,?,?)",
      ["user", name, mobile, email, password1, isadmin ? "1" : "0", fdate()]
    )
      .then(async (result) => {
        var userstring = await resultdb("select * from config where ename=?", [
          "appid",
        ]);
        if (userstring.rows.length === 0) {
          await resultdb(
            "INSERT into config (ename, mname, value,value1,value2, value3, created) values (?,?,?,?,?,?,?)",
            ["appid", name, "appid" + mobile, email, "", fdate(), fdate()]
          );
        }
        Alert.alert("Хэрэглэгч нэмлээ :" + name);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        alert(
          err.message.toString().includes("UNIQUE")
            ? "utasnii dugaar burtgeltei bain"
            : "Хэрэглэгч бүртгэхэд асуудал гарлаа."
        );
      });
  };
  return (
    <View>
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
        maxLength={8}
        onChangeText={setMobile}
        // onEndEditing={() => {
        //   if (mobile.length !== 8) {
        //     Alert("Утсны дугаар алдаатай");
        //   }
        //   return;
        // }}
      />
      <TextInput
        style={css.inputField}
        askeyboardType="number-pad"
        keyboardType="email-address"
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
      <View style={css.rowview}>
        <CheckBox
          title={"admin"}
          checked={isadmin}
          onPress={() => setisadmin(!isadmin)}
        />
      </View>
      <View style={css.rowview}>
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
    marginTop: 20,
  },
  rowview: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
});
