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
  const [myemail, setMyemail] = useState("nasaa88@gmail.com");
  return (
    <View>
      <Image
        style={{ width: "95%", height: "50%", justifyContent: "center" }}
        source={require("../../assets/log.jpg")}
      />
      <Text style={{ textAlign: "center", fontSize: 18 }}>
        Хэрэглэгчийн нэр, нууц үг ээ оруулна уу
      </Text>
      <Text> ӨӨрчоөро л {setMyemail}</Text>

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
      />
      <View style={css.Button}>
        <Button
          onPress={() => props.navigation.navigate("Home")}
          title="Нэвтрэх"
        />
      </View>
      <View style={css.Button}>
        <Button
          onPress={() => props.navigation.navigate("Home")}
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
