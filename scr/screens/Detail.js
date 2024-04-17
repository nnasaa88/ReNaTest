import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
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
  const [saving, setSaving] = useState(false);

  const mystatus = useContext(Mycontext);
  const [sex, setsex] = useState(selected.sex);
  const [im, setim] = useState(selected.im);
  const [tamga, settamga] = useState(selected.tamga);
  const [name, setname] = useState(selected.id > 0 ? selected.name : "?");
  const [color, setcolor] = useState(selected.id > 0 ? selected.color : "?");
  const [image, setimage] = useState(selected.image);
  const [desc, setdesc] = useState(selected.id > 0 ? selected.desc : "?");
  const [helder, sethelder] = useState(selected.helder);
  const [mygroup, setmygroup] = useState(selected.mygroup);
  const [isbackup, setisbackup] = useState(selected.isbackup);
  const [bdate, setbdate] = useState(
    selected.id > 0 ? selected.start : fdate()
  );
  const [tuluv, settuluv] = useState(
    selected.id > 0 ? selected.status : "Амьд"
  );
  const [qty, setqty] = useState(selected.id > 0 ? selected.qty : 1);
  {
    selected.id > 0 ? (selectedid = selected.id) : (selectedid = 0);
  }
  const HandlerBack = async () => {
    props.navigation.goBack();
  };
  const HandlerSave = async () => {
    console.log("saving1");
    setSaving(true);
    let mysql;
    if (name.length < 2) {
      alert("Нэр дутуу байна");
      setSaving(false);
      return;
    }
    {
      console.log("saving2");
      selectedid === 0
        ? (mysql =
            "insert into items (type,sex,im,tamga,name,color,image,qty,desc,start,mygroup,helder,status,created, modified,isbackup) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
        : (mysql = `update items set type=?,sex=?,im=?,tamga=?,name=?,color=?,image=?,qty=?,desc=?,start=?,mygroup=?,helder=?,status=?,created=?, modified=?, isbackup=? where id=${selectedid}`);
      console.log("saving3");
    }
    console.log("saving4");
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
      isbackup + "-update",
    ]);
    let a;
    console.log("saving5");
    console.log(userstring);
    if (selectedid === 0) {
      a = userstring.insertId;
      userstring = await resultdb(
        "insert into events (itemsId,event,desc,date,created,modified) values(?,?,?,?,?,?)",
        [a, "Анхлан бүртгэв", desc, bdate, fdate(), mystatus.Storename]
      );
      mysql = "Хадгаллаа";
    } else {
      a = selectedid;
      userstring = await resultdb(
        "insert into events (itemsId,event,desc,date,created,modified) values(?,?,?,?,?,?)",
        [a, "Засвар хийсэн", desc, bdate, fdate(), mystatus.Storename]
      );
      mysql = "Заслаа";
    }
    setSaving(false);
    alert(mysql);
    props.navigation.goBack();
  };
  const pickImage = async (val) => {
    // No permissions request is necessary for launching the image library
    let result;
    if (val === 1) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
    }

    console.log(result);

    if (!result.cancelled) {
      setimage(result.uri);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 12 }}>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 20,
            color: "#B84229",
            fontWeight: "bold",
          }}
        >
          {mystatus.Activetype} ({selectedid}) мэдээлэл оруулж байна{" "}
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
            selectedValue={tamga}
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
          <Text style={[css.text, { flex: 1 }]}>Им</Text>
          <Picker
            style={{ flex: 5 }}
            selectedValue={im}
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
          <Text style={[css.text, { flex: 1 }]}>Малчин</Text>
          <Picker
            style={{ flex: 5 }}
            selectedValue={helder}
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
          <Text style={[css.text, { flex: 1 }]}>Сүрэг</Text>
          <Picker
            style={{ flex: 5 }}
            selectedValue={mygroup}
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
          <Text style={[css.text, { flex: 1 }]}>Нэрлэх</Text>
          <TextInput
            defaultValue={name}
            style={(css.input, { flex: 5 })}
            placeholder="Нэрлэнэ үү"
            onChangeText={(d) => (d !== "" ? setname(d) : setname("?"))}
          />
        </View>
        <View flexDirection="row" justifyContent="center">
          <Text style={[css.text, { flex: 1 }]}>Төрсөн</Text>
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
            keyboardType="numeric"
            value={qty > 0 ? qty.toString() : 1}
            placeholder="Тоо, ш"
            onChangeText={(d) =>
              d > 0 ? setqty(d) : Alert.alert("Тоо байх учиртай")
            }
          />
          <Text style={[css.text, { flex: 1 }]}> Төлөв </Text>
          <TextInput
            style={[css.text, { flex: 2, fontWeight: "bold", fontSize: 14 }]}
            editable={false}
            defaultValue={tuluv === null ? "Dtgui" : tuluv}
          />
        </View>
        <TextInput
          style={css.input}
          defaultValue={color}
          placeholder="Зүсэлнэ үү"
          onChangeText={(d) => (d !== "" ? setcolor(d) : setcolor("?"))}
        />
        <TextInput
          style={css.desc}
          defaultValue={desc}
          multiline={true}
          placeholder="Тайлбар бичиж болно."
          onChangeText={(d) => (d !== "" ? setdesc(d) : setdesc("?"))}
        />
        <View style={{ flex: 1 }} flexDirection="row" justifyContent="center">
          <View
            style={{
              flex: 1,
              marginTop: 20,
              marginBottom: 20,
              paddingHorizontal: 15,
            }}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Button
              style={{
                marginLeft: 15,
                borderRadius: 20,
              }}
              onPress={() => {
                pickImage(0);
              }}
              title="Зураг авах"
            />
            <Button
              style={{ marginLeft: 15 }}
              onPress={() => {
                pickImage(1);
              }}
              title="Зураг татах"
            />
          </View>
          <Image
            source={{ uri: image }}
            style={{
              flex: 3,
              width: 200,
              height: 200,
              padding: 5,
              borderWidth: 1,
              borderColor: "black",
            }}
          />
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
        <View>
          {!saving ? (
            <Button
              style={[css.button, { marginRight: 15 }]}
              onPress={HandlerSave}
              title="Хадгалах"
            />
          ) : (
            <ActivityIndicator color="black" />
          )}
        </View>

        <Button
          style={[css.button, { marginLeft: 15 }]}
          onPress={HandlerBack}
          title=" Буцах "
        />
      </View>
    </View>
  );
};

export const css = StyleSheet.create({
  text: {
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
    textAlign: "center",
    borderWidth: 5,
    borderColor: "#8987C1",
    justifyContent: "flex-end",
  },
  desc: {
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
