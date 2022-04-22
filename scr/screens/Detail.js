import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Picker,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { CheckBox, Icon } from "react-native-elements";
import Mycontext from "../../context/Mycontext";

export default () => {
  const mystatus = useContext(Mycontext);
  const [sex] = useState(["Эр", "Эм", "Эцэг"]);
  const [herder, setherder] = useState(["Davaa", "Dorj"]);
  const [mygroup, setmygroup] = useState(["1", "2"]);

  return (
    <View>
      <Text> {mystatus.Activetype} + мэдээлэл оруулж байна </Text>
      <Picker>
        {sex.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker>
        {mystatus.Im.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker>
        {mystatus.Tamga.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker>
        {herder.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker>
        {mygroup.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <TextInput
        placeholder="Нэр бичнэ үү"
        onChangeText={console.log("dsfdsfds")}
      />
      <TextInput
        placeholder="Зүсэлнэ үү"
        onChangeText={console.log("Зүслэх")}
      />
      <TextInput
        placeholder="Тайлбар бичиж болно."
        onChangeText={console.log("Зүслэх")}
      />
      <Text>Төлөв</Text>

      <Image
        style={{
          width: "50%",
          height: "30%",
          justifyContent: "center",
          resizeMode: "stretch",
        }}
        source={require("../../assets/sheep.jpg")}
      />
    </View>
  );
};

const css = StyleSheet.create({});
