import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Mycontext, { fdate } from "../../context/Mycontext";
import { resultdb } from "../../database/db";

import { Mymodal } from "../../database/Search";

const Flatlistscreen = () => {
  const mystatus = useContext(Mycontext);
  const [rnmodalvisible, setrnmodalvisible] = useState(false);
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

  return (
    <View>
      <Mymodal
        seemodal={rnmodalvisible}
        hidemodal={() => setrnmodalvisible(false)}
      />
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== "android" &&
          (({ highlighted }) => (
            <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
          ))
        }
        data={items}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            key={item.index}
            onPress={() => handleClick(item.name)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          >
            <View style={{ backgroundColor: "white" }}>
              <Text>
                {index + 1}) {item.name} {item.color}
                {item.tamge} {item.im} {item.desc}
                {item.image}
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Flatlistscreen;

const styles = StyleSheet.create({});
