import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Picker,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import DatePicker from "react-native-datepicker";
import { Button, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
// import { InputText } from "react-native-input-list";

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
  const [image, setimage] = useState(selected.image);
  const [desc, setdesc] = useState(selected.desc);
  const [helder, sethelder] = useState(selected.helder);
  const [mygroup, setmygroup] = useState(selected.mygroup);
  const [bdate, setbdate] = useState(selected.bdate);
  const [tuluv, settuluv] = useState(selected.tuluv);
  const [qty, setqty] = useState(selected.qty);

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
        [a, "Анхлан бүртгэв", desc, "bdate", "fdate()", "mystatus.setStorename"]
      );
      mysql = "Хадгаллаа";
    } else {
      a = selectedid;
      userstring = await resultdb(
        "insert into events (itemsId,event,desc,date,created,modified) values(?,?,?,?,?,?)",
        [a, "Засвар хийсэн", desc, "bdate", "fdate()", "mystatus.setStorename"]
      );
      mysql = "Заслаа";
    }
    // mysql = `${a} , Засвар хийсэн, ${desc} , ${bdate}, ${fdate()},  ${
    //   mystatus.setStorename
    // } fdfdf `;
    console.log(mysql);
    Alert.alert(mysql);
    props.navigation.goBack();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
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
          <Text style={[css.text, { flex: 1 }]}>Хүйс тамга</Text>
          <Picker
            style={(css.pick, { flex: 2 })}
            selectedValue={sex}
            onValueChange={(l) => {
              setsex(l);
            }}
          >
            {["?", "Эр", "Эм", "Эцэг"].map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
          <Picker
            style={{ flex: 3 }}
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
            style={{ flex: 5 }}
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
          {/* <InputText ref="thirdInput" keyboardType="numeric" label="Numeric" /> */}
          <Picker
            style={{ flex: 5 }}
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
            style={{ flex: 5 }}
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
            style={(css.input, { flex: 5 })}
            placeholder="Нэрлэнэ үү"
            onChangeText={setname}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>Төрсөн</Text>
          <DatePicker
            style={(css.input, { flex: 5 })}
            date={bdate}
            placeholder="Төрсөн огноо"
            format="YYYY-MM-DD"
            confirmBtnTestID="Ok"
            cancelBtnText="No"
            onDateChange={(d) => setbdate(d)}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={[css.text, { flex: 1 }]}> Тоо </Text>
          <TextInput
            style={[css.input, { flex: 1 }]}
            defualtdValue={qty}
            placeholder="Тоо, ш"
            onChangeText={setqty}
          />
          <Text style={[css.text, { flex: 1 }]}> Төлөв </Text>
          <TextInput
            style={[css.text, { flex: 2 }]}
            editable={false}
            defaultValue={tuluv}
          />
        </View>
        <TextInput
          style={css.input}
          defaultValue={color}
          placeholder="Зүсэлнэ үү"
          onChangeText={setcolor}
        />
        <TextInput
          style={css.desc}
          defaultValue={desc}
          multiline={true}
          placeholder="Тайлбар бичиж болно."
          onChangeText={setdesc}
        />
        <View style={{ flex: 1 }} flexDirection="row" justifyContent="center">
          <View
            style={{ flex: 1 }}
            flexDirection="column"
            justifyContent="center"
          >
            <Button
              style={{ marginLeft: 15 }}
              onPress={pickImage}
              title="Зураг авах"
            />
            <Button
              style={{ marginLeft: 15 }}
              onPress={pickImage}
              title="Зураг татах"
            />
          </View>
          <TouchableOpacity
            style={[
              css.text,
              { flex: 2, justifyContent: "center", alignItems: "center" },
            ]}
            // onPress={pickImage}
          >
            <ImageBackground
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 1,
          justifyContent: "space-between",
          marginRight: 35,
          marginLeft: 35,
        }}
      >
        <Button
          style={[css.button, { marginRight: 15 }]}
          onPress={HandlerSave}
          title="Хадгалах"
        />
        <Button
          style={[css.button, { marginLeft: 15 }]}
          onPress={HandlerBack}
          title=" Буцах "
        />
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
    // flex: 1,
    fontSize: 12,
    padding: 5,
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
    padding: 15,
  },
});
