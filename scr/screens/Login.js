import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TextInput,
} from "react-native";

export default function (props) {
  const [Myemail, setMyemail] = useState("jhjdas");
  const [Mypass, setMypass] = useState("jhjdas");
  return (
    <View>
      <Image
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          resizeMode: "stretch",
        }}
        source={require("../../assets/log.jpg")}
      />
      <Text style={{ textAlign: "center", fontSize: 18 }}>
        Хэрэглэгчийн нэр, нууц үг ээ оруулна уу
        {Myemail} - {Mypass}
      </Text>
      <TextInput
        autoCapitalize="words"
        style={css.input}
        placeholder="Емайл хаягаа оруулна уу"
        onChangeText={setMyemail}
      />

      <TextInput
        secureTextEntry={true}
        style={css.input}
        placeholder="Нууц үгээ оруулна уу"
        onChangeText={setMypass}
      />
      <View style={css.Button}>
        <Button
          onPress={() => props.navigation.navigate("Home")}
          title="Нэвтрэх"
        />
      </View>
      <View style={css.Button}>
        <Button
          onPress={() => props.navigation.navigate("List")}
          title="Буцах"
        />
      </View>
    </View>
  );
}
const css = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  Button: { marginVertical: 10, marginHorizontal: 50 },
});
