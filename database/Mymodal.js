import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";

const Mymodal1 = (props) => {
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
                <Icon name="close" />
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
};
export default Mymodal1;

const css = StyleSheet.create({
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
});
