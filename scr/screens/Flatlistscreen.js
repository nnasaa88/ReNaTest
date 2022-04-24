import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Mymodal } from "../../database/Search";

const Flatlistscreen = () => {
  const [rnmodalvisible, setrnmodalvisible] = useState(false);
  const [Persons, setPersons] = useState([
    { name: "Amaraa", key: "56" },
    { name: "Amaa", key: "6" },
    { name: "Amadfraa", key: "16" },
    { name: "Amaasds", key: "5" },
  ]);
  const handleClick = (name) => {
    setrnmodalvisible(true);
    // setPersons((oldPersons) => oldPersons.filter((el) => el.name !== name));
    // Alert.alert(name + " сайн уу талаараа хар");
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
        data={Persons}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            key={item.index}
            onPress={() => handleClick(item.name)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          >
            <View style={{ backgroundColor: "white" }}>
              <Text>
                {index + 1}) {item.name} {item.key}
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
