import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import Mycontext, { fdate } from "../../context/Mycontext";
import Mymodal1 from "../../database/Mymodal";
import { resultdb } from "../../database/db";

import { Mymodal } from "../../database/Search";

const Flatlistscreen1 = () => {
  const mystatus = useContext(Mycontext);
  const [rnmodalvisible, setrnmodalvisible] = useState(false);
  const [rnmodalvisible1, setrnmodalvisible1] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    // StatusBar.setBarStyle("dark-content", false);
    var userstring;
    userstring = await resultdb("select * from items", []);
    setItems(userstring.rows._array);
  }, []);

  const handleClick = (name) => {
    setrnmodalvisible(true);
  };
  const handleClick1 = (name) => {
    setrnmodalvisible1(true);
  };

  return (
    <View>
      <Mymodal
        seemodal={rnmodalvisible}
        hidemodal={() => setrnmodalvisible(false)}
      />
      <Mymodal1
        seemodal={rnmodalvisible1}
        hidemodal={() => setrnmodalvisible1(false)}
      />
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== "android" &&
          (({ highlighted }) => (
            <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
          ))
        }
        data={items}
        key={items.id}
        // renderItem={UserCard}
        renderItem={({ item, index, separators }) => (
          <View
            style={{
              margin: 4,
              backgroundColor: "#E1E43B",
              marginRight: 40,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              height: 60,
            }}
          >
            <View>
              <TouchableOpacity onPress={() => handleClick1(item.name)}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text
                style={{ fontSize: 16 }}
              >{`${item.name} ${item.color}`}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(`Тайлбар: ${item.desc}`);
                }}
              >
                <Icon name="phone" style={{ marginLeft: 12 }} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(`Төрсөн огноо ${item.bdate}`);
                }}
              >
                <Icon
                  name="message-circle"
                  style={{ marginLeft: 14 }}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Flatlistscreen1;

function UserCard({ item }) {
  return (
    <View
      style={{
        margin: 4,
        backgroundColor: "#E1E43B",
        marginRight: 40,
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
          <Icon name="phone" style={{ marginLeft: 12 }} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(`Messaging ${item.tamga}`);
          }}
        >
          <Icon name="message-circle" style={{ marginLeft: 14 }} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
