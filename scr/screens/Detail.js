import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import Mycontext from "../../context/Mycontext";

export default () => {
  const mystatus = useContext(Mycontext);
  return (
    <View>
      <Text> {mystatus.Activetype} + Dahin </Text>
    </View>
  );
};

const css = StyleSheet.create({});
