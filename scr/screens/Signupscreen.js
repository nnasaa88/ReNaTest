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
import { initdb } from "../../database/db";

export default function ({ route, navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isadmin, setisadmin] = useState(false);
  const [nemeh, setnemeh] = useState(true);
  const [ustgah, setustgah] = useState(false);
  const [zasah, setzasah] = useState(false);
  const [tuluv, settuluv] = useState(false);
  const [batlah, setbatlah] = useState(false);
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
    const str =
      "'" +
      name +
      "','" +
      mobile +
      "','" +
      email +
      "','" +
      password1 +
      "','" +
      isadmin +
      "','" +
      nemeh +
      "','" +
      ustgah +
      "','" +
      zasah +
      "','" +
      tuluv +
      "','" +
      batlah +
      "'";
    initdb(
      "insert into users (name, mobile,email,pass, isadmin,nemeh,ustgah,zasah,tuluv,batlah) values (" +
        str +
        ");"
    )
      .then((result) => console.log("Хэрэглэгч нэмлээ" + { name }))
      .catch((err) => console.log("Items асуудал гарлаа." + err.message));

    //   if (Setdata(mobile, name, email, password1)) {
    //     Alert.alert("Амжилттай бүртгэлээ");
    //     return;
    // } else {
    //   Alert.alert("Бүртгэхд алдаа гарлаа");
    // }
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
      <View style={css.rowview}>
        <CheckBox
          title={"admin"}
          checked={isadmin}
          onPress={() => setisadmin(!isadmin)}
        />
        <CheckBox
          title={"нэмэх"}
          checked={nemeh}
          onPress={() => setnemeh(!nemeh)}
        />
        <CheckBox
          title={"устгах"}
          checked={ustgah}
          onPress={() => setustgah(!ustgah)}
        />
      </View>
      <View style={css.rowview}>
        <CheckBox
          title={"засах"}
          checked={zasah}
          onPress={() => setzasah(!zasah)}
        />
        <CheckBox
          title={"төлөв"}
          checked={tuluv}
          onPress={() => settuluv(!tuluv)}
        />
        <CheckBox
          title={"батлах"}
          checked={batlah}
          onPress={() => setbatlah(!batlah)}
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
  rowview: { flexDirection: "row", justifyContent: "space-evenly" },
});
