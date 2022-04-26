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
import { Feather as Icon1, EvilIcons, AntDesign } from "@expo/vector-icons";

import Mycontext, { fdate } from "../context/Mycontext";
import { resultdb } from "./db";

export default function SearchScreen1(props) {
  const mystatus = useContext(Mycontext);
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterfield, setFilterfield] = useState("color");

  const [rnmodalvisible, setrnmodalvisible] = useState(false);
  const [modalbody, setmodalbody] = useState("");

  useEffect(async () => {
    StatusBar.setBarStyle("dark-content", false);
    var userstring;
    userstring = await resultdb("select * from items where type=?", [
      mystatus.Activetype,
    ]);
    setItems(userstring.rows._array);
    setFilteredUsers(items);
  }, []);

  const HandlerAdd = () => {
    props.navigation.navigate("Detail");
  };
  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
      <View style={css.container}>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>{mystatus.Activetype} </Text>
          <Button onPress={HandlerAdd} title="байхгүй бол бүртгээрэй" />
          <Mymodal
            seemodal={rnmodalvisible}
            hidemodal={() => setrnmodalvisible(false)}
            modalbody={modalbody}
          />
        </View>
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
                // const filtered_users = users.filter((user) =>
                //   user.name.first.toLowerCase().startsWith(text.toLowerCase())
                // );
                const filtered_users = items.filter((user) =>
                  user.color.toLowerCase().includes(text.toLowerCase())
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
                <EvilIcons name="close" size={24} color="#060606" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {filteredUsers.length > 0 ? (
          <ScrollView key={items.id}>
            {filteredUsers.map((user) => (
              <TouchableOpacity
                style={css.userCard}
                onPress={() => {
                  setrnmodalvisible(true);
                  setmodalbody(
                    `${user.id} тай ${user.name} ийн  ${user.tamga} зүс ${user.color}`
                  );
                }}
              >
                <Image
                  style={css.userImage}
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
                  }}
                />
                <View key={user.id} style={css.userCardRight}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500" }}
                  >{`${user.color} ${user.im}`}</Text>
                  <Text>{`${user?.tamga}`}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ height: 50 }}></View>
          </ScrollView>
        ) : searchText.length > 0 ? (
          <View style={css.messageBox}>
            <Text style={css.messageBoxText}>Хайлт олдсонгүй</Text>
          </View>
        ) : (
          <View style={css.messageBox}>
            <Text style={css.messageBoxText}>Хайх талбар,утгаа оруулна уу</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export function Mymodal(props) {
  const mystatus = useContext(Mycontext);
  const data = [
    {
      label: "data 1",
    },
    {
      label: "data 2",
    },
  ];
  return (
    <View style={css.centeredview}>
      <Modal visible={props.seemodal} animationType="slide" transparent={true}>
        <View style={[css.centeredview, { marginTop: 150 }]}>
          <View style={css.modalview}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              {" "}
              {mystatus.Storename}
              {"  Юу хийх вэ."}
            </Text>
            <Text style={{ marginTop: 10 }}>
              {props.modalbody}
              {
                "hgjhgjhhhgghghjghgg  g gjggghghgjhg h h g   gggg     hghgh   hh    hgjghgjhghgjg    ggfhg gfhfgfgfgfgh fdf f"
              }
            </Text>
            {/* <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} /> */}
            <View
              style={{ marginTop: 10, backgroundColor: "#CFD20F" }}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text style={[css.text, { flex: 1, fontSize: 14 }]}>
                {" "}
                Яах санаатай??!!
              </Text>
              <Picker
                style={css.pick}
                selectedValue={mystatus.Event}
                onValueChange={(l) => {
                  mystatus.setEvent(l);
                }}
              >
                {[" ? ", "Засах", "Борлуулах", "Хорогдол", "Хэрэглээ"].map(
                  (l) => (
                    <Picker.Item label={l} value={l} />
                  )
                )}
              </Picker>
            </View>
            <View
              style={{ marginTop: 10 }}
              flexDirection="row"
              justifyContent="center"
            >
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  props.hidemodal();
                  console.log("Event hii");
                }}
              >
                <Text> БАТЛАХ </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  props.hidemodal();
                  mystatus.setEvent("");
                }}
              >
                <Text> БУЦАХ </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export function Mymodal1(props) {
  return (
    <View style={css.centeredview}>
      <Modal visible={props.seemodal} animationType="slide" transparent={true}>
        <View style={[css.centeredview, { marginTop: 50 }]}>
          <View style={css.modalview}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {" "}
                Томсгов{" "}
              </Text>
              <TouchableOpacity
                style={{ marginBottom: 5, alignItems: "center" }}
                onPress={() => {
                  console.log("garlaa");
                  props.hidemodal();
                }}
              >
                <EvilIcons name="close" size={30} />
              </TouchableOpacity>
            </View>
            <Image
              style={{
                width: "100%",
                height: "60%",
                borderRadius: 100,
              }}
              source={{
                uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export const Flatlistscreen = (props) => {
  const mystatus = useContext(Mycontext);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterfield, setFilterfield] = useState("color");
  const [modalbody, setmodalbody] = useState("");
  const [rnmodalvisible, setrnmodalvisible] = useState(false);
  const [rnmodalvisible1, setrnmodalvisible1] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    // StatusBar.setBarStyle("dark-content", false);
    var userstring;
    userstring = await resultdb("select * from items", []);
    setItems(userstring.rows._array);
    setFilteredUsers(items);
  }, []);

  const HandlerAdd = () => {
    props.navigation.navigate("Detail", { item: {} });
  };
  const handleModal = (name) => {
    setrnmodalvisible(true);
  };
  const handleModal1 = (name) => {
    setrnmodalvisible1(true);
  };

  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
      <View style={css.container}>
        <View flexDirection="row" justifyContent="center">
          <Text style={css.text}>{mystatus.Activetype} </Text>
          <Button onPress={HandlerAdd} title="байхгүй бол бүртгээрэй" />
        </View>
        <View>
          <Mymodal
            seemodal={rnmodalvisible}
            hidemodal={() => setrnmodalvisible(false)}
          />
          <Mymodal1
            seemodal={rnmodalvisible1}
            hidemodal={() => setrnmodalvisible1(false)}
          />
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
                  const filtered_users = items.filter((user) =>
                    user.color.toLowerCase().includes(text.toLowerCase())
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
                <View>
                  <TouchableOpacity onPress={() => handleModal1(item.name)}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                      }}
                      source={{
                        uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => handleModal(item.name)}>
                    <Text
                      style={{ fontSize: 16 }}
                    >{`${item.name} ${item.color}`}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("Detail", { item: item });
                    }}
                  >
                    <Icon1 name="pen-tool" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(`Төрсөн огноо ${item.bdate}`);
                    }}
                  >
                    <Icon1
                      name="alert-circle"
                      style={{ marginLeft: 14 }}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

function UserCard({ item }) {
  return (
    <View
      style={{
        margin: 4,
        backgroundColor: "#E1E43B",
        marginRight: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        height: 60,
      }}
    >
      <View>
        <TouchableOpacity onPress={() => handleClick(item.name)}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={{
              uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 16 }}>{`${item.name} ${item.color}`}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(`Calling ${item.im}`);
          }}
        >
          <Icon1 name="phone" style={{ marginLeft: 12 }} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(`Messaging ${item.tamga}`);
          }}
        >
          <Icon1 name="message-circle" style={{ marginLeft: 14 }} size={20} />
        </TouchableOpacity>
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
