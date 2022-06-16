import React, { useContext, useState, useEffect } from "react";
import { Button, Text, TouchableOpacity, View, Alert } from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { resultdb } from "../../database/db";
import Mycontext, { fdate } from "../../context/Mycontext";
import { css } from "../../database/Search";

export default function Getplace() {
  const mystatus = useContext(Mycontext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshcoor, setRefreshcoor] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [refreshcoor]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // text = JSON.stringify(location);
    text = `Өрг: ${location.coords.latitude}, Урт: ${location.coords.longitude}`;
  }

  return (
    <View>
      <Text>Газрын байрлал</Text>
      <View flexDirection="row" justifyContent="center">
        <Text style={css.text}>{text}</Text>
        <TouchableOpacity
          style={{
            marginVertical: 5,
            marginHorizontal: 15,
            alignItems: "center",
          }}
          onPress={() => {
            setRefreshcoor(!refreshcoor);
          }}
        >
          <FontAwesome name="refresh" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
