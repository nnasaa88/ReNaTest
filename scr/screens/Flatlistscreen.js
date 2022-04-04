import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import React from "react";

const Flatlistscreen = () => {
  const persons = [
    { name: "Amaraa", key: "56" },
    { name: "Amaa", key: "6" },
    { name: "Amadfraa", key: "16" },
    { name: "Amaasds", key: "5" },
  ];
  const handleClick = (name) => {
    Alert.alert(name + " сайн уу талаараа хар");
  };
  return (
    <FlatList
      ItemSeparatorComponent={
        Platform.OS !== "android" &&
        (({ highlighted }) => (
          <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
        ))
      }
      data={persons}
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
  );
};

export default Flatlistscreen;

const styles = StyleSheet.create({});
