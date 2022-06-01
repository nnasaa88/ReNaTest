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
  ScrollView,
} from "react-native";
import SplashScreen from "./SplashScreen";
import Mycontext from "../../context/Mycontext";
import { Getdata, Setdata } from "./Signupscreen";
import { getdb, resultdb } from "../../database/db";
import { fdistance, Getplace1 } from "./Mymap";
import { getCloud, setCloud } from "../../database/Firebase";
// import { getSMS } from "../../database/Sms";

export default function (props) {
  const [mobile, setMobile] = useState("");
  const [Mypass, setMypass] = useState("");
  const mystatus = useContext(Mycontext);
  let arrpush = [];
  // let Userinfo1 = {};

  const Handlerlogin = async () => {
    var userstring;
    if (Mypass === mystatus.Storepass) {
      mystatus.setisLoggedIn(true);
      userstring = await resultdb("select * from config");
      mystatus.Closedfield.map((el) => {
        arrpush = ["?"];
        const filtered_users = userstring.rows._array.filter(
          (elem) => elem.ename === el.ename
        );
        filtered_users.map((l) => arrpush.push(l.value));
        switch (el.ename) {
          case "im":
            mystatus.setIm(arrpush);
            break;
          case "tamga":
            mystatus.setTamga(arrpush);
            break;
          case "status":
            mystatus.setTuluv(arrpush);
            break;
          case "helder":
            mystatus.setHelder(arrpush);
            break;
          case "mygroup":
            mystatus.setMygroup(arrpush);
            break;
        }
      });
      setMypass(null);
      props.navigation.navigate("Home");
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
        maxLength={8}
        // autoFocus={true}
        style={css.input}
        placeholder="Утсаа оруулна уу"
        onChangeText={setMobile}
        onEndEditing={async () => {
          const userstring = await resultdb(
            "select * from config where ename='user' and value = ?",
            [mobile]
          );
          if (userstring.rows.length !== 0) {
            mystatus.setUserinfo(userstring.rows.item(0));
            mystatus.setStorename(mystatus.Userinfo.mname);
            mystatus.setStorepass(mystatus.Userinfo.value2);
          } else {
            Alert.alert("Хэрэглэгч олдсонгүй");
            mystatus.setStorename("Хэрэглэгч олдсонгүй");
            mystatus.setStorepass("sssssssssss");
          }
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 14 }}>
        Хэрэглэгч: {mystatus.Storename}
      </Text>
      <TextInput
        defaultValue={Mypass}
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
      <View style={{ backgroundColor: "yellow" }}>
        <Text> Тэстийн хэсэг </Text>
        <ScrollView>
          <View style={css.Button} flexDirection="row" justifyContent="center">
            <Button
              onPress={() => Getdata("86163023")}
              title="LocalStorage - > Get"
            />
            <Button
              onPress={() => Setdata("86163023", "name", "email", "nnutga")}
              title="Set"
            />
          </View>
          <View style={css.Button} flexDirection="row" justifyContent="center">
            <Button
              onPress={() => getCloud("id", 19)}
              title="Firebase - > Get"
            />
            <Button onPress={() => setCloud()} title="Set" />
          </View>
          <View style={css.Button} flexDirection="row" justifyContent="center">
            {/* <Button onPress={() => getSMS()} title="Message - > Get" /> */}
            <Button onPress={() => setCloud()} title="Set" />
          </View>
          <View style={css.Button}>
            <Button
              onPress={() => {
                // getdb("insert into config (ename, value) values (?, ?)", [
                //   "user",
                //   "admin2",
                // ]);
                // getdb("drop table users");
                // getdb("alter table items drop isbackup text");
                getdb("select * from users");
                // getdb("delete from config where ename='user'");
                // getdb("update items set qty=1 where qty is null");
              }}
              title="SQLdatabase - DB"
            />
          </View>
        </ScrollView>
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
