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
import * as Location from "expo-location";
import { resultdb } from "../../database/db";
import Mycontext, { fdate } from "../../context/Mycontext";
import { css } from "../../database/Search";
import Getplace from "./Mymap";

export default function (props) {
  const mystatus = useContext(Mycontext);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterfield, setFilterfield] = useState("status");
  const [items, setItems] = useState([]);
  const [desc, setdesc] = useState("");
  const [checkadd, setcheckadd] = useState(true);
  const [refreshpick, setrefreshpick] = useState(0);
  const [myloc, setmyloc] = useState(0);

  let myval = [];
  useEffect(async () => {
    var userstring;
    userstring = await resultdb("select * from config", []);
    setItems(userstring.rows._array);
    setFilteredUsers(
      userstring.rows._array.filter((el) => el.ename === filterfield)
    );
  }, [refreshpick]);

  const HandlerSave = async (para) => {
    let mysql;
    // alert(para);
    mysql =
      "insert into config (ename,mname ,value1,value2,Desc,created,user) values (?,?,?,?,?,?,?)";
    resultdb(mysql, para)
      .then((e) => {
        mysql = "Хадгаллаа";
        setrefreshpick(refreshpick + 1);
      })
      .catch((e) => alert(e));
    //alert(mysql);
  };

  return (
    <View style={{ flex: 1, paddingTop: 15 }}>
      <Text style={[css.text, { flex: 1, fontSize: 16 }]}>
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
            setSearchText("");
            console.log(l);
          }}
        >
          {mystatus.Closedfield.map((l) => (
            <Picker.Item key={l.id} label={l.mname} value={l.ename} />
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
                el.value1.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredUsers(filtered_users);
            if (text !== "" && filteredUsers.length === 0) {
              setcheckadd(false);
              console.log(myloc);

              // setdesc( "");
            }
          }}
          returnKeyType="search"
        />
      </View>
      <View style={{ flex: 6, paddingHorizontal: 10 }} justifyContent="center">
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
            extraData={refreshpick}
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
                  height: 50,
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  {`${item.value1}:${item.value2} - ${item.Desc}`}
                </Text>
              </View>
            )}
          />
        ) : searchText.length > 0 ? (
          <View style={css.messageBox}>
            <TextInput
              style={[css.input, {}]}
              defaultValue={desc}
              multiline={true}
              placeholder="Утга байхгүй тул нэмэх боломжой. Тайлбараа бичнэ үү"
              placeholderTextColor="red"
              onChangeText={setdesc}
            />
          </View>
        ) : (
          <View style={css.messageBox}>
            <Text style={css.messageBoxText}> Нэмэгдэх утгаа шалгах </Text>
          </View>
        )}
      </View>
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
            filterfield === "space" ? "fjufjfu" : "",
            desc,
            fdate(),
            mystatus.Storename,
          ];
          console.log(myval);
          HandlerSave(myval);
          setSearchText("");
          setcheckadd(true);
          setdesc("");
        }}
        title="Нэмэх"
      />
      <View style={{ flex: 6, paddingHorizontal: 100 }}>
        <Getplace />
      </View>
    </View>
  );
}
