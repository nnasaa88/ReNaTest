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
import Mycontext, { fdate } from "../../context/Mycontext";
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
  const [bdate, setbdate] = useState(fdate());
  const [tuluv, settuluv] = useState("Амьд");

  const HandlerSave = async () => {
    var userstring = await resultdb(
      "insert into items (type,sex,im,tamga,color,speccolor,image,desc,start,mygroup,helder,status,created, modified) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
        "Амьд",
        fdate(),
        fdate(),
      ]
    );
    let a = userstring.insertId;
    userstring = await resultdb(
      "insert into events (itemsId,event,desc,date,created,modified) values(?,?,?,?,?,?)",
      [a, "auto from details add", desc, bdate, fdate(), fdate()]
    );
    Alert.alert("Хадгаллаа");
    props.navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8 }}>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 20,
            color: "#B84229",
            fontWeight: "bold",
          }}
        >
          {mystatus.Activetype} + мэдээлэл оруулж байна{" "}
        </Text>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Хүйс</Text>
          <Picker
            style={css.pick}
            // selectedValue={sex}
            onValueChange={(l) => {
              setsex(l);
            }}
          >
            {["?", "Эр", "Эм", "Эцэг"].map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
          <Text style={css.text}>Тамга</Text>
          <Picker
            style={css.pick}
            onValueChange={(l) => {
              settamga(l);
            }}
          >
            {mystatus.Tamga.map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Им</Text>
          <Picker
            style={{ flex: 6 }}
            onValueChange={(l) => {
              setim(l);
            }}
          >
            {mystatus.Im.map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Малчин</Text>
          <Picker
            style={{ flex: 4 }}
            onValueChange={(l) => {
              sethelder(l);
            }}
          >
            {mystatus.Helder.map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Бүлэг</Text>
          <Picker
            style={{ flex: 4 }}
            onValueChange={(l) => {
              setmygroup(l);
            }}
          >
            {mystatus.Mygroup.map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Нэрлэх</Text>
          <TextInput
            style={css.input}
            placeholder="Нэрлэнэ үү"
            onChangeText={setname}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Төрсөн</Text>
          <DatePicker
            style={{ flex: 2, padding: 5 }}
            date={bdate}
            placeholder="Төрсөн"
            format="YYYY-MM-DD"
            confirmBtnTestID="Ok"
            cancelBtnText="No"
            onDateChange={(d) => setbdate(d)}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Зүслэх</Text>
          <TextInput
            style={css.input}
            placeholder="Зүсэлнэ үү"
            onChangeText={setcolor}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Төлөв</Text>
          <TextInput style={css.input} editable={false} defaultValue="Амьд" />
        </View>
        <TextInput
          style={css.desc}
          multiline={true}
          placeholder="Тайлбар бичиж болно."
          onChangeText={setdesc}
        />
        <Image
          style={{
            flex: 1,
            width: "50%",
            height: "30%",
            justifyContent: "center",
            resizeMode: "stretch",
          }}
          source={require("../../assets/sheep.jpg")}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button style={css.button} onPress={HandlerSave} title="Хадгалах" />
      </View>
    </View>
  );
};

const css = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 12,
    padding: 3,
    marginHorizontal: 5,
    marginVertical: 1,
    justifyContent: "space-between",
    textAlign: "left",
    borderWidth: 1,
    borderColor: "#74D122",
    borderBottomWidth: 5,
  },
  pick: {
    // fontSize: 12,
    // padding: 10,
    flex: 2,
    // width: "70%",
    textAlign: "center",
    borderWidth: 5,
    borderColor: "black",
    justifyContent: "flex-end",
  },
  desc: {
    flex: 1,
    fontSize: 12,
    padding: 1,
    marginHorizontal: 5,
    marginVertical: 1,
    justifyContent: "space-between",
    textAlign: "left",
    borderWidth: 1,
    borderColor: "#74D122",
    borderBottomWidth: 5,
    // height: 100,
  },
  input: {
    flex: 4,
    fontSize: 14,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 1,
    justifyContent: "space-between",
    textAlign: "left",
    borderWidth: 1,
    borderColor: "#74D122",
    borderBottomWidth: 5,
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 10,
    justifyContent: "center",
  },
});
