import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  FlatList,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Picker,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Feather as Icon1, EvilIcons } from "@expo/vector-icons";

import Mycontext, { fdate } from "../context/Mycontext";
import { resultdb } from "./db";

export default function EventListScreen(props) {
  const mystatus = useContext(Mycontext);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterfield, setFilterfield] = useState("name");
  const [items, setItems] = useState([]);
  const [iteminfo, setIteminfo] = useState("Мэдээлэл");

  var selected = props.route.params.item;
  var selectedid = 0;
  {
    selected.id > 0 ? (selectedid = selected.id) : (selectedid = 0);
  }

  useEffect(async () => {
    // StatusBar.setBarStyle("dark-content", false);
    var userstring;
    if (selected.id > 0) {
      setIteminfo(selected.name + " нэр " + selected.color + "зүстэй ");
      userstring = await resultdb(
        "select *, id as key from events where itemsid=?",
        [selectedid]
      );
    } else {
      selectedid = 0;
      userstring = await resultdb(
        "select a.*, b.*, a.id as key from events a left join items b on a.itemsid=b.id where type=?",
        [mystatus.Activetype]
      );
    }
    setItems(userstring.rows._array);
    setFilteredUsers(items);
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
      <View style={css.container}>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>{mystatus.Activetype} </Text>
          <Text style={css.text}>{iteminfo}</Text>
        </View>
        <View>
          <View style={css.searchView}>
            <View
              style={css.inputView}
              flexDirection="row"
              justifyContent="center"
            >
              <Picker
                style={{ flex: 1 }}
                selectedValue={filterfield}
                onValueChange={(l) => {
                  setFilterfield(l.value);
                }}
              >
                {[
                  { name: "event", value: "color" },
                  { name: "user", value: "im" },
                  { name: "date", value: "tamga" },
                  { name: "type", value: "desc" },
                ].map((l) => (
                  <Picker.Item label={l.name} value={l.value} />
                ))}
              </Picker>
              <TextInput
                style={{ flex: 6}}
                defaultValue={searchText}
                placeholder="Хайя"
                placeholderTextColor="blue"
                textContentType="name"
                onChangeText={(text) => {
                  setSearchText(text);
                  if (text === "") {
                    return setFilteredUsers(items);
                  }
                  const filtered_users = items.filter((user) =>
                    user.event.toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredUsers(filtered_users);
                }}
                returnKeyType="search"
              />
              {searchText.length === 0 ? (
                <TouchableOpacity>
                  <Icon1 name="search" size={24} color="#333" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText("");
                    setFilteredUsers(items);
                  }}
                >
                  <EvilIcons name="close" size={24} color="#333" />
                </TouchableOpacity>
              )}
            </View>
          </View>
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
            key={items.key}
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
                  height: 60,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedid > 0) {
                        setIteminfo(
                          selected.name + " нэр " + selected.color + "зүстэй "
                        );
                      } else {
                        setIteminfo(item.name + " нэр " + item.key + "зүстэй ");
                      }
                    }}
                  >
                    <Text
                      style={{ fontSize: 16 }}
                    >{`${item.event}  ${item.key} ${item.itemid}  ${item.desc} ${item.created}`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            // keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </View>
  );
}
const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 5,
  },
  searchView: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  inputView: {
    flex: 1,
    height: 40,
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 10,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
  },
  userCard: {
    backgroundColor: "#fafafa",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userCardRight: {
    paddingHorizontal: 10,
  },
  messageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  messageBoxText: {
    fontSize: 20,
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
    padding: 3,
    marginHorizontal: 5,
    marginVertical: 1,
    justifyContent: "space-between",
    textAlign: "left",
    borderWidth: 1,
    borderColor: "#74D122",
    borderBottomWidth: 5,
  },
  centeredview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalview: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});
