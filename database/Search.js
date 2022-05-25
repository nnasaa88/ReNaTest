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
    props.navigation.navigate("Detail", { item: {} });
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
                { name: "Малчин", value: "helder" },
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
                const filtered_users = items.filter((item) =>
                  item.color.toLowerCase().includes(text.toLowerCase())
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
                <Image style={css.userImage} source={{ uri: user.image }} />
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  alignItems: "center",
                }}
              >
                {" "}
                {mystatus.Storename}
                {" Яах санаатай??!!."}
              </Text>
              <TouchableOpacity
                style={{ marginBottom: 5, alignItems: "center" }}
                onPress={() => {
                  props.hidemodal();
                }}
              >
                <EvilIcons name="close" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 10 }}>
              {props.modalbody}
              {"-f-"}
            </Text>
            {/* <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} /> */}
            <View
              style={{ marginTop: 10, backgroundColor: "#CFD20F" }}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
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
            <TextInput
              style={css.textinput}
              // onChangeText={mystasetEvent}
              value={mystatus.Event}
            />

            <View
              style={{ marginTop: 10 }}
              flexDirection="row"
              justifyContent="center"
            >
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  props.hidemodal();
                  console.log(mystatus.Event);
                }}
              >
                <Text> БАТЛАХ </Text>
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
                  console.log(props.outimage);
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
              source={{ uri: props.outimage }}
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
  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredUsers1, setFilteredUsers1] = useState([]);
  const [filterfield, setfilterfield] = useState("status");
  const [filterfield1, setfilterfield1] = useState("helder");
  const [filterfield2, setfilterfield2] = useState("name");
  const [modalbody, setmodalbody] = useState("Body msg");
  const [rnmodalvisible, setrnmodalvisible] = useState(false);
  const [rnmodalvisible1, setrnmodalvisible1] = useState(false);
  const [inimage, setinimage] = useState("Zurag url");
  const [items, setItems] = useState([]);
  const [myarray, setmyarray] = useState([]);
  const [myarray1, setmyarray1] = useState([]);
  const [mycount, setmycount] = useState([]);
  var filtered_users = ["sdsd", "fdggfh"];

  useEffect(async () => {
    // StatusBar.setBarStyle("dark-content", false);
    var userstring;
    userstring = await resultdb("select * from items where type=?", [
      mystatus.Activetype,
    ]);
    setItems(userstring.rows._array);
    setFilteredUsers(items);
    setmycount(items.length);
    setmyarray(mystatus.Tuluv);
    setmyarray1(mystatus.Helder);
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
  const refreshFlat = (f1, v1, f2, v2) => {
    switch (f1) {
      case "status":
        if (v1 !== "?") {
          filtered_users = items.filter((item) => item.status === v1);
        } else {
          filtered_users = items;
        }
        break;
      case "im":
        if (v1 !== "?") {
          filtered_users = items.filter((item) => item.im === v1);
        } else {
          filtered_users = items;
        }
        break;
      case "tamga":
        if (v1 !== "?") {
          filtered_users = items.filter((item) => item.tamga === v1);
        } else {
          filtered_users = items;
        }
        break;
      case "helder":
        if (v1 !== "?") {
          console.log(`${f1} status ees ${v1} , ${f2} - ${v2}`);
          filtered_users = items.filter((item) => item.helder === v1);
        } else {
          filtered_users = items;
        }
        break;
    }
    switch (f2) {
      case "status":
        if (v2 !== "?") {
          filtered_users = filtered_users.filter((item) => item.status === v2);
        } else {
          filtered_users = filtered_users;
        }
        break;
      case "im":
        if (v2 !== "?") {
          filtered_users = filtered_users.filter((item) => item.im === v2);
        } else {
          filtered_users = filtered_users;
        }
        break;
      case "tamga":
        if (v2 !== "?") {
          filtered_users = filtered_users.filter((item) => item.tamga === v2);
        } else {
          filtered_users = filtered_users;
        }
        break;
      case "helder":
        if (v2 !== "?") {
          filtered_users = filtered_users.filter((item) => item.helder === v2);
        } else {
          filtered_users = filtered_users;
        }
        break;
    }
    setFilteredUsers1(filtered_users);
    setFilteredUsers(filtered_users);
    setmycount(filtered_users.length);
  };
  return (
    <View style={[css.container, { flex: 1 }]}>
      <View>
        <Mymodal
          seemodal={rnmodalvisible}
          hidemodal={() => setrnmodalvisible(false)}
          modalbody={modalbody}
        />
        <Mymodal1
          seemodal={rnmodalvisible1}
          hidemodal={() => setrnmodalvisible1(false)}
          outimage={inimage}
        />
      </View>
      <View style={{ flex: 1 }} flexDirection="row" justifyContent="center">
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Event", { item: {} });
          }}
        >
          <Icon1 name="zoom-in" style={{ marginLeft: 14 }} size={34} />
        </TouchableOpacity>
        <Text style={css.text}>
          {mystatus.Activetype} {mycount}
        </Text>
        <Button onPress={HandlerAdd} title="байхгүй бол бүртгээрэй" />
      </View>
      <View style={[css.searchView, { flex: 3 }]}>
        <View
          style={(css.inputView, { flex: 1 })}
          flexDirection="row"
          justifyContent="center"
        >
          <Picker
            style={{ flex: 1 }}
            selectedValue={filterfield}
            onValueChange={(l) => {
              setfilterfield(l);
              switch (l) {
                case "status":
                  setmyarray(mystatus.Tuluv);
                  return;
                case "im":
                  setmyarray(mystatus.Im);
                  return;
                case "helder":
                  setmyarray(mystatus.Helder);
                  return;
                case "tamga":
                  setmyarray(mystatus.Tamga);
                  return;
              }
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
          <Picker
            style={{ flex: 2 }}
            selectedValue={searchText}
            onValueChange={(l) => {
              setSearchText(l);
              refreshFlat(filterfield, l, filterfield1, searchText1);
            }}
          >
            {myarray.map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <View
          style={(css.inputView, { flex: 1 })}
          flexDirection="row"
          justifyContent="center"
        >
          <Picker
            style={{ flex: 1 }}
            selectedValue={filterfield1}
            onValueChange={(l) => {
              setfilterfield1(l);
              switch (l) {
                case "status":
                  setmyarray1(mystatus.Tuluv);
                  return;
                case "im":
                  setmyarray1(mystatus.Im);
                  return;
                case "helder":
                  setmyarray1(mystatus.Helder);
                  return;
                case "tamga":
                  setmyarray1(mystatus.Tamga);
                  return;
              }
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
          <Picker
            style={{ flex: 2 }}
            selectedValue={searchText1}
            onValueChange={(l) => {
              setSearchText1(l);
              refreshFlat(filterfield, searchText, filterfield1, l);
            }}
          >
            {myarray1.map((l) => (
              <Picker.Item label={l} value={l} />
            ))}
          </Picker>
        </View>
        <View
          style={[css.inputView, { flex: 1 }]}
          flexDirection="row"
          justifyContent="center"
        >
          <Picker
            style={{ flex: 1 }}
            selectedValue={filterfield2}
            onValueChange={(l) => {
              setfilterfield2(l);
            }}
          >
            {[
              { name: "Нэр", value: "name" },
              { name: "Зүс", value: "color" },
              { name: "Т.бар", value: "desc" },
            ].map((l) => (
              <Picker.Item label={l.name} value={l.value} />
            ))}
          </Picker>
          <TextInput
            defaultValue={searchText2}
            style={[css.input, { flex: 2 }]}
            placeholder="Хайя"
            placeholderTextColor="blue"
            textContentType="name"
            onChangeText={(text) => {
              setSearchText2(text);
              if (text === "") {
                setmycount(filteredUsers1.length);
                return setFilteredUsers(filteredUsers1);
              }
              switch (filterfield2) {
                case "name":
                  filtered_users = filteredUsers1.filter((item) => {
                    if (item.desc !== null) {
                      item.name.toLowerCase().includes(text.toLowerCase());
                    } else item;
                  });
                  break;
                case "color":
                  filtered_users = filteredUsers1.filter((item) => {
                    if (item.color !== null) {
                      item.desc.toLowerCase().includes(text.toLowerCase());
                    } else item;
                  });
                  break;
                case "desc":
                  filtered_users = filteredUsers1.filter((item) => {
                    if (item.desc !== null) {
                      item.desc.toLowerCase().includes(text.toLowerCase());
                    } else item;
                  });
                  break;
              }
              setFilteredUsers(filtered_users);
              setmycount(filtered_users.length);
            }}
            returnKeyType="search"
          />
          {searchText2.length === 0 ? (
            <TouchableOpacity>
              <Icon1 name="search" size={24} color="#333" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSearchText2("");
                setFilteredUsers(filteredUsers1);
                setmycount(filteredUsers1.length);
              }}
            >
              <EvilIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ flex: 10 }}>
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
                  <TouchableOpacity
                    onPress={() => handleModal1(setinimage(item.image))}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                      }}
                      source={{ uri: item.image }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleModal(setmodalbody(item.name))}
                  >
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
                      props.navigation.navigate("Event", { item: item });
                    }}
                  >
                    <Icon1
                      name="zoom-in"
                      style={{ marginLeft: 14 }}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
    // flex: 1,
    paddingHorizontal: 3,
    paddingTop: 1,
  },
  searchView: {
    paddingTop: 1,
    backgroundColor: "#dfe4ea",
  },
  inputView: {
    height: 10,
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 3,
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    // flex: 1,
    paddingHorizontal: 3,
    height: 40,
    fontSize: 18,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
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
