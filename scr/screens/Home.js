import React, { useLayoutEffect, useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { getFirestore } from "firebase/firestore";
import {
  deleteDoc,
  doc,
  query,
  setDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { resultdb } from "../../database/db";
import { setCloud } from "../../database/Firebase";
import Mycontext, { Mystore } from "../../context/Mycontext";

export default function (props) {
  const mystatus = useContext(Mycontext);
  const [countcolor, setcountcolor] = useState("black");
  const [colorcloud, setcolorcloud] = useState("black");
  const [countcloud, setcountcloud] = useState(0);
  const netinfo = useNetInfo();
  const db = getFirestore();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          size={30}
          style={{ marginRight: 20 }}
          name="settings"
          color="black"
          onPress={() => {
            props.navigation.navigate("Config");
          }}
        />
      ),
    });
  }, [props.navigation]);
  useEffect(async () => {
    var userstring;
    userstring = await resultdb(
      "select * from items where isbackup is null or ltrim(isbackup,6)='update'",
      []
    );
    setcountcloud(userstring.rows._array.length);
    countcloud > 0 ? setcountcolor("green") : setcountcolor("black");
    netinfo.isConnected ? setcolorcloud("green") : setcolorcloud("red");
  }, [mystatus.Activetype]);

  const horsetouch = () => {
    mystatus.setActivetype("Адуу");
    props.navigation.navigate("Searchdb");
  };
  const cattletouch = () => {
    mystatus.setActivetype("Үхэр");
    props.navigation.navigate("List");
  };
  const sheeptouch = () => {
    mystatus.setActivetype("Хонь");
    props.navigation.navigate("List");
  };
  const goattouch = () => {
    mystatus.setActivetype("Ямаа");
    props.navigation.navigate("List");
  };

  const upcloud = async () => {
    if (!netinfo.isConnected || countcloud <= 0) {
      Alert.alert(
        countcloud !== 0
          ? "Интернэт холболтоо шалгана уу!!!"
          : "Нөөцлэх мэдээлэл алга."
      );
      return;
    }
    var userstring;
    let st;
    let st1;
    let mysql;
    userstring = await resultdb(
      "select * from items where isbackup is null or ltrim(isbackup,6)='update'",
      []
    );
    Alert.alert(userstring.rows._array.length + " Цааш явлаа");
    userstring.rows._array.map(async (l) => {
      const docData = {
        id: l.id,
        type: l.type,
        sex: l.sex,
        im: l.im,
        tamga: l.tamga,
        name: l.name,
        color: l.color,
        // image: l.image,
        qty: l.qty.toString(),
        desc: l.desc,
        start: l.start,
        finish: l.finish,
        mygroup: l.mygroup,
        helder: l.helder,
        status: l.status,
        created: l.created,
      };
      st = await addDoc(collection(db, "items"), docData);
      st1 = st.path.toString().split("/")[1];
      mysql = `update items set isbackup=? where id=${l.id}`;
      await resultdb(mysql, [st1]);
      setcountcloud(0);
      console.log(st.path.toString().split("/")[1]);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 40,
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 10,
          backgroundColor: "#D6EAF8",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            upcloud();
          }}
        >
          <FontAwesome name="cloud-upload" size={40} color={colorcloud} />
        </TouchableOpacity>
        <Text style={{ color: { countcolor } }}>{countcloud}</Text>
      </View>
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
          <TouchableOpacity activeOpacity={0.5} onPress={goattouch}>
            <Image
              style={css.image}
              source={require("../../assets/goat.jpg")}
            />
          </TouchableOpacity>
          <Text style={css.text}> Ямаан сүрэг </Text>
        </View>
      </View>
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
