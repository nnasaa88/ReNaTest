import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

import Mycontext, { Mystore } from "../../context/Mycontext";
import { Getdata, Setdata } from "./Signupscreen";

const SplashScreen = () => {
  const mystatus = useContext(Mycontext);
  useEffect(() => {
    AsyncStorage.getItem(mystatus.Storemobile)
      .then((data) => {
        console.log("=======", data);
        if (data !== null) {
          const user = JSON.parse(data);
          console.log("--------", user);
          //   mystatus.setStorename(user.name);
          //   mystatus.setStorepass(user.password1);
        } else console.log("-data null----", user);

        // mystatus.setIsLoading(false);
      })
      .catch((err) =>
        console.log("Токенийг утаснаас уншиж чадсангүй. Алдаа : " + err.message)
      );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="gray" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          top: 20,
        }}
      >
        Түр хүлээнэ үү...
      </Text>
    </View>
  );
};
export default SplashScreen;
