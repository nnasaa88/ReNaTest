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
  StyleSheet,
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
  const [refreshpick, setrefreshpick] = useState(0);

  let myval = [];
  useEffect(async () => {
    var userstring;
    userstring = await resultdb("select * from config", []);
    setItems(userstring.rows._array);
    const filtered_users = items.filter((el) => el.ename === filterfield);
    setFilteredUsers(filtered_users);
  }, [refreshpick]);

  const HandlerSave = async (para) => {
    let mysql;
    console.log(para);
    mysql =
      "insert into config (ename,mname ,value,value1,value2,Desc,isback,created,user) values (?,?,?,?,?,?,?,?,?)";
    var userstring = await resultdb(mysql, para);
    mysql = "Хадгаллаа";
    setrefreshpick(refreshpick + 1);
    Alert.alert(mysql);
  };

  return (
    <View style={{ flex: 1, paddingTop: 15 }}>
      <Text style={[css.text, { flex: 1, fontSize: 14 }]}>
        Хаалттай талбарын утга оруулах
      </Text>
      <View style={{ flex: 1 }} flexDirection="row" justifyContent="center">
        <Picker
          style={[css.text, { flex: 2 }]}
          selectedValue={filterfield}
          onValueChange={(l) => {
            setFilterfield(l);
            const filtered_users = items.filter((el) => el.ename === l);
            setFilteredUsers(filtered_users);
          }}
        >
          {mystatus.Closedfield.map((l) => (
            <Picker.Item label={l.mname} value={l.ename} />
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
              const filtered_users = items.filter(
                (el) => el.ename === filterfield
              );
              return setFilteredUsers(filtered_users);
            }
            // console.log(filteredUsers);
            const filtered_users = items.filter(
              (el) =>
                el.ename === filterfield &&
                el.value.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredUsers(filtered_users);
            if (text !== "" && filteredUsers.length === 0) {
              setcheckadd(false);
            }
          }}
          returnKeyType="search"
        />
      </View>
      <View style={{ flex: 4, paddingHorizontal: 10 }} justifyContent="center">
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
            key={filteredUsers.id}
            keyExtractor={(filteredUser) => filteredUser.id}
            renderItem={({ item, index, separators }) => (
              <View
                style={{
                  margin: 4,
                  backgroundColor: "#D4DE10",
                  marginRight: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {`${item.ename} ${item.mname} ${item.value} ${item.desc}`}
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
            <Text style={css.messageBoxText}>Нэмэгдэх утгаа шалгах</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 8, paddingHorizontal: 100 }}>
        <Button
          disabled={checkadd}
          onPress={() => {
            let x = mystatus.Closedfield.findIndex(
              (el) => el.ename === filterfield,
              0
            );
            myval = [
              filterfield,
              mystatus.Closedfield[x].mname,
              searchText,
              "",
              "",
              desc,
              "",
              fdate(),
              mystatus.Storename,
            ];
            HandlerSave(myval);
            setSearchText("");
            setdesc("");
          }}
          title="Нэмэх"
        />
      </View>
    </View>
  );
}
