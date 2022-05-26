import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Picker,
  TextInput,
} from "react-native";
import { resultdb } from "../../database/db";
import Mycontext, { fdate } from "../../context/Mycontext";
import { css } from "../../database/Search";

export default function (props) {
  const mystatus = useContext(Mycontext);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterfield, setFilterfield] = useState("status");
  const [items, setItems] = useState([]);
  const [desc, setdesc] = useState("");
  const [checkadd, setcheckadd] = useState(true);

  let myval = [];
  useEffect(async () => {
    var userstring;
    userstring = await resultdb("select * from config", []);
    setItems(userstring.rows._array);
    setFilteredUsers(userstring.rows._array);
    console.log(filteredUsers);
    console.log(userstring.rows._array);
  }, []);

  const HandlerSave = async (para) => {
    let mysql;
    console.log(para);
    mysql =
      "insert into items (ename,mname ,value,value1,value2,Desc,isback,created,user) values (?,?,?,?,?,?,?,?,?)";
    var userstring = await resultdb(mysql, para);
    console.log(userstring);
    mysql = "Хадгаллаа";
    Alert.alert(mysql);
  };
  return (
    <View style={{ flex: 1, paddingTop: 15 }}>
      <Text style={[css.text, { fontSize: 14 }]}>
        Хаалттай талбарын утга оруулах
      </Text>
      <View flexDirection="row" justifyContent="center">
        <Picker
          style={[css.text, { flex: 2 }]}
          selectedValue={filterfield}
          onValueChange={(l) => {
            setFilterfield(l);
          }}
        >
          {[
            { name: "Төлөв", value: "status" },
            { name: "Им", value: "im" },
            { name: "Тамга", value: "tamga" },
            { name: "Малчин", value: "helder" },
          ].map((l) => (
            <Picker.Item label={l.name} value={l.value} />
          ))}
        </Picker>
        <TextInput
          defaultValue={searchText}
          style={[css.input, { flex: 3 }]}
          placeholder="Нэмэх утга"
          placeholderTextColor="blue"
          onChangeText={(text) => {
            setSearchText(text);
            if (text === "") {
              setcheckadd(true);
              return setFilteredUsers(items);
            }
            // console.log(filteredUsers);
            const filtered_users = items.filter((item) => {
              item.mname.toLowerCase().includes(text.toLowerCase());
              setFilteredUsers(filtered_users);
            });
            if (text !== "" && filteredUsers.length === 0) {
              setcheckadd(false);
            }
          }}
          returnKeyType="search"
        />
      </View>
      <View flexDirection="row" justifyContent="center">
        <Button
          style={[css.button, {}]}
          disabled={checkadd}
          onPress={() => {
            myval = [
              filterfield,
              "tuluv",
              searchText,
              "",
              "",
              desc,
              "",
              fdate(),
              mystatus.Storename,
            ];
            HandlerSave(myval);
          }}
          title={"Нэмэх"}
        />
        {filteredUsers.length > 0 ? (
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== "android" &&
              (({ highlighted }) => (
                <View
                  style={[style.separator, highlighted && { marginLeft: 0 }]}
                />
              ))
            }
            data={filteredUsers}
            keyExtractor={(filteredUser) => filteredUser.id}
            renderItem={({ item, index, separators }) => (
              <View
                style={{
                  margin: 4,
                  // backgroundColor: "#D4DE10",
                  // marginRight: 8,
                  // paddingHorizontal: 10,
                  // paddingVertical: 4,
                  // borderRadius: 10,
                  // flexDirection: "row",
                  // alignItems: "center",
                  height: 60,
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  {`${item.ename} ${item.mname}`}
                </Text>
              </View>
            )}
          />
        ) : searchText.length > 0 ? (
          <View style={css.messageBox}>
            <TextInput
              style={[css.input, {}]}
              multiline={true}
              placeholder="Утга байхгүй тул нэмэх боломжой. Тайлбараа бичнэ үү"
              placeholderTextColor="red"
              onChangeText={setdesc}
            />
          </View>
        ) : (
          <View style={css.messageBox}>
            <Text style={css.messageBoxText}>Нэмэх утгаа оруулна уу</Text>
          </View>
        )}
      </View>
    </View>
  );
}
