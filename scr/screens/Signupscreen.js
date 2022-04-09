import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";

export default function ({ route, navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = () => {
    // Alert.alert(`Таны утас: ${phone}, нууц үг: ${password}`);
    navigation.push("Login", {
      phone,
      password,
      garchig: "Таны нууц үг дээр байна",
    });
  };

  return (
    <View>
      <Image
        style={{ width: "100%", height: "50%", resizeMode: "stretch" }}
        source={require("../../assets/log.jpg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray",
        }}
      >
        Шинээр бүртгүүлэх
      </Text>

      <TextInput
        style={css.inputField}
        askeyboardType="number-pad"
        placeholder="Та имэйл хаягаа оруулна уу"
        onChangeText={setPhone}
      />

      <TextInput
        style={css.inputField}
        secureTextEntry={true}
        placeholder="Нууц үгээ оруулна уу"
        onChangeText={setPassword}
      />

      <TextInput
        style={css.inputField}
        secureTextEntry={true}
        placeholder="Нууц үгээ давтан оруулна уу"
        onChangeText={setPassword}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button title="Буцах" onPress={() => navigation.goBack()} />
        <Button title="Бүртгэх" onPress={signupHandler} />
      </View>
    </View>
  );
}

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
  },
});
