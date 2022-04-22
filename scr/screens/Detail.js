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
import DatePicker from "react-native-datepicker";
import { Button, Icon } from "react-native-elements";
import Mycontext from "../../context/Mycontext";
import { getdb, resultdb } from "../../database/db";

export default (props) => {
  const mystatus = useContext(Mycontext);
  const [sex, setsex] = useState("");
  const [im, setim] = useState("");
  const [tamga, settamga] = useState("");
  const [name, setname] = useState("");
  const [color, setcolor] = useState("");
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState("url://");
  const [helder, sethelder] = useState("");
  const [mygroup, setmygroup] = useState(["1", "2"]);
  const [bdate, setbdate] = useState("2000-04-22");
  //   const [mdate] = new Date().getDate() + "/" + new Date().getFullYear();

  console.log(mdate);
  const HandlerSave = async () => {
    const userstring = await resultdb(
      "insert into items (type,sex,im,tamga,color,speccolor,image,desc,start,mygroup,helder,status,created) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        mystatus.Activetype,
        sex,
        im,
        tamga,
        name,
        color,
        image,
        desc,
        bdate,
        mygroup,
        helder,
        "anid",
        "mdate",
      ]
    );
    console.log("Хадгаллаа");
    props.navigation.goBack();
  };
  return (
    <View>
      <Text> {mystatus.Activetype} + мэдээлэл оруулж байна </Text>
      <Picker
        onValueChange={(l) => {
          setsex(l);
        }}
      >
        {["Эр", "Эм", "Эцэг"].map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker
        onValueChange={(l) => {
          setim(l);
        }}
      >
        {mystatus.Im.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker
        onValueChange={(l) => {
          settamga(l);
        }}
      >
        {mystatus.Tamga.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker
        onValueChange={(l) => {
          sethelder(l);
        }}
      >
        {mystatus.Helder.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <Picker
        onValueChange={(l) => {
          setmygroup(l);
        }}
      >
        {mystatus.Mygroup.map((l) => (
          <Picker.Item label={l} value={l} />
        ))}
      </Picker>
      <TextInput placeholder="Нэр бичнэ үү" onChangeText={setname} />
      <TextInput placeholder="Зүсэлнэ үү" onChangeText={setcolor} />
      <TextInput placeholder="Тайлбар бичиж болно." onChangeText={setdesc} />
      <Text>Төлөв</Text>
      <DatePicker
        date={bdate}
        placeholder="Төрсөн он сар"
        format="YYYY-MM-DD"
        confirmBtnTestID="Ok"
        cancelBtnText="No"
        onDateChange={(d) => setbdate(d)}
      />
      <Image
        style={{
          width: "50%",
          height: "30%",
          justifyContent: "center",
          resizeMode: "stretch",
        }}
        source={require("../../assets/sheep.jpg")}
      />
      <View>
        <Button onPress={HandlerSave} title="Хадгалах" />
      </View>
    </View>
  );
};

const css = StyleSheet.create({});
