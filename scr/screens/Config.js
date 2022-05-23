import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Picker,
  TextInput,
} from "react-native";
import { Feather as Icon1, EvilIcons } from "@expo/vector-icons";
import Mycontext from "../../context/Mycontext";

export default function (props) {
  const mystatus = useContext(Mycontext);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterfield, setFilterfield] = useState("color");
  const [items, setItems] = useState([]);

  useEffect(async () => {
    var userstring;
    userstring = await resultdb("select * from events where ename=?", [
      mystatus.Activetype,
    ]);
    setItems(userstring.rows._array);
    setFilteredUsers(items);
    // console.log(items);
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
      <Text style={[css.text, { fontSize: 14 }]}>
        Байнга хэрэглэгдэх хэв шинжүүдийг оруулах
      </Text>
      <View style={css.container}>
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
                  { name: "Нэр", value: "color" },
                  { name: "Им", value: "im" },
                  { name: "Тамга", value: "tamga" },
                  { name: "Т/бар", value: "desc" },
                ].map((l) => (
                  <Picker.Item label={l.name} value={l.value} />
                ))}
              </Picker>
              <TextInput
                style={{ flex: 6 }}
                defaultValue={searchText}
                style={css.input}
                placeholder="Хайя"
                placeholderTextColor="blue"
                textContentType="name"
                onChangeText={(text) => {
                  setSearchText(text);
                  if (text === "") {
                    return setFilteredUsers(items);
                  }
                  const filtered_users = items.filter((item) =>
                    item.name.toLowerCase().includes(text.toLowerCase())
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
            // data={items}
            data={filteredUsers}
            key={items.id}
            // renderItem={UserCard}
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
                  // onPress={}
                  >
                    <Text
                      style={{ fontSize: 16 }}
                    >{`${item.ename} ${item.mname}`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 5,
  },
  searchView: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  inputView: {
    height: 40,
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 10,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
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
    textAlign: "center",
    borderWidth: 5,
    borderColor: "#8987C1",
    justifyContent: "flex-end",
  },
});
