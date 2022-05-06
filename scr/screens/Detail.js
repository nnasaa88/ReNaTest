import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Picker,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import DatePicker from "react-native-datepicker";
import { Button, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

import Mycontext, { fdate } from "../../context/Mycontext";
import { getdb, resultdb } from "../../database/db";

export default (props) => {
  var selected = props.route.params.item;
  var selectedid = 0;
  {
    selected.id > 0 ? (selectedid = selected.id) : (selectedid = 0);
  }
  const mystatus = useContext(Mycontext);
  const [sex, setsex] = useState(selected.sex);
  const [im, setim] = useState(selected.im);
  const [tamga, settamga] = useState(selected.tamga);
  const [name, setname] = useState(selected.name);
  const [color, setcolor] = useState(selected.color);
  const [desc, setdesc] = useState(selected.desc);
  const [helder, sethelder] = useState(selected.helder);
  const [mygroup, setmygroup] = useState(selected.mygroup);
  const [bdate, setbdate] = useState(selected.bdate);
  const [tuluv, settuluv] = useState(selected.tuluv);
  const [qty, setqty] = useState(selected.qty);
  const [image, setimage] = useState(null);

  const HandlerBack = async () => {
    props.navigation.goBack();
  };
  const HandlerSave = async () => {
    let mysql;
    {
      selectedid === 0
        ? (mysql =
            "insert into items (type,sex,im,tamga,name,color,image,qty,desc,start,mygroup,helder,status,created, modified) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
        : (mysql = `update items set type=?,sex=?,im=?,tamga=?,name=?,color=?,image=?,qty=?,desc=?,start=?,mygroup=?,helder=?,status=?,created=?, modified=? where id=${selectedid}`);
    }

    var userstring = await resultdb(mysql, [
      mystatus.Activetype,
      sex,
      im,
      tamga,
      name,
      color,
      image,
      qty,
      desc,
      bdate,
      mygroup,
      helder,
      tuluv,
      fdate(),
      mystatus.Storename,
    ]);
    let a;
    if (selectedid === 0) {
      a = userstring.insertId;
      userstring = await resultdb(
        "insert into events (itemsId,event,desc,date,created,modified) values(?,?,?,?,?,?)",
        [a, "Анхлан бүртгэв", desc, bdate, fdate(), mystatus.setStorename]
      );
      mysql = "Хадгаллаа";
    } else {
      a = selectedid;
      userstring = await resultdb(
        "insert into events (itemsId,event,desc,date,created,modified) values(?,?,?,?,?,?)",
        [a, "Засвар хийсэн", desc, bdate, fdate(), mystatus.setStorename]
      );
      mysql = "Заслаа";
    }
    Alert.alert(mysql);
    props.navigation.goBack();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setimage(result.uri);
    }
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
            selectedValue={sex}
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
            defaultValue={tamga}
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
            defaultValue={im}
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
            defaultValue={helder}
            placeholder="Малчин нь"
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
          <Text style={css.text}>Сүрэг</Text>
          <Picker
            style={{ flex: 4 }}
            defaultValue={mygroup}
            placeholder="Сүрэг байдаг уу"
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
            defaultValue={name}
            style={css.input}
            placeholder="Нэрлэнэ үү"
            onChangeText={setname}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Төрсөн</Text>
          <DatePicker
            style={css.input}
            date={bdate}
            placeholder="Төрсөн"
            format="YYYY-MM-DD"
            confirmBtnTestID="Ok"
            cancelBtnText="No"
            onDateChange={(d) => setbdate(d)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={css.input}
            defaultValue={color}
            placeholder="Зүсэлнэ үү"
            onChangeText={setcolor}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}> Тоо </Text>

          <TextInput
            style={css.input}
            defualtdValue={qty}
            placeholder="Тоо, ш"
            onChangeText={setqty}
          />
          <TextInput style={css.text} editable={false} defaultValue={tuluv} />
        </View>
        <TextInput
          style={css.desc}
          defaultValue={desc}
          multiline={true}
          placeholder="Тайлбар бичиж болно."
          onChangeText={setdesc}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        {/* <Image
          style={{
            flex: 1,
            width: "50%",
            height: "30%",
            justifyContent: "center",
            resizeMode: "stretch",
          }}
          source={{ uri: selected.image }}
        /> */}
      </View>
      <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
        <Button style={css.button} onPress={HandlerSave} title="Хадгалах" />
        <Button style={css.button} onPress={HandlerBack} title=" Буцах " />
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
    borderColor: "#8987C1",
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
    borderColor: "#8987C1",
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
    borderColor: "#8987C1",
    borderBottomWidth: 5,
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 40,
    justifyContent: "center",
    padding: 5,
  },
});
