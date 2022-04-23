import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import axios from "axios";
import { resultdb } from "./db";

export default function SearchScreen1(props) {
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(async () => {
    StatusBar.setBarStyle("dark-content", false);
    var userstring;
    userstring = await resultdb("select * from items", []);
    setItems(userstring.rows._array);
    setFilteredUsers(items);
  }, []);

  const HandlerAdd = () => {
    props.navigation.navigate("Detail");
  };
  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
      <View style={styles.container}>
        <Button onPress={HandlerAdd} title="Олдохгүй бол нэмээрэй" />
        <View style={styles.searchView}>
          <View style={styles.inputView}>
            <TextInput
              defaultValue={searchText}
              style={styles.input}
              placeholder="Search"
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
                  user.color.toLowerCase().startsWith(text.toLowerCase())
                );
                setFilteredUsers(filtered_users);
              }}
              returnKeyType="search"
            />
            {searchText.length === 0 ? (
              <TouchableOpacity>
                <Icon name="search" size={24} color="#333" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSearchText("");
                  setFilteredUsers(items);
                }}
              >
                <Icon name="cancel" size={24} color="#333" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {filteredUsers.length > 0 ? (
          <ScrollView>
            {filteredUsers.map((user) => (
              <TouchableOpacity
                style={styles.userCard}
                onPress={() => {
                  Alert.alert(
                    `${user.color} ${user.tamga}`,
                    `You can call me at ${user.im}`
                  );
                }}
              >
                <Image style={styles.userImage} source={{ uri: user.image }} />
                <View style={styles.userCardRight}>
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
          <View style={styles.messageBox}>
            <Text style={styles.messageBoxText}>No user found</Text>
          </View>
        ) : (
          <View style={styles.messageBox}>
            <Text style={styles.messageBoxText}>Search for users</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
