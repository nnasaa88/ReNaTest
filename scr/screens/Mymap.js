import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Mycontext, { fdate } from "../../context/Mycontext";
import { css } from "../../database/Search";

export default function Getplace() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // text = JSON.stringify(location);
    text = `Одоогийн байрлал өргөрөг ${location.coords.latitude} уртраг ${location.coords.longitude}`;
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}
// export const Getplace1 = () => {
//   const gps = async () => {await Location.getCurrentPositionAsync({})};
//   location=gps().then((result) =>return result)
//   .then((err) => return err);
// };
