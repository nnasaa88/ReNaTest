import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const Mymodal1 = (props) => {
  //   const [rnmodalvisible, setrnmodalvisible] = useState(true);
  //   console.log(props.seemodal + " sdfsdfds ");
  //   setrnmodalvisible(props.seemodal);
  return (
    <View style={css.centeredview}>
      <Modal visible={props.seemodal} animationType="slide" transparent={true}>
        <View style={[css.centeredview, { marginTop: -200 }]}>
          <View style={css.modalview}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              {" "}
              Modoal title{" "}
            </Text>
            <Text style={{ marginTop: 10 }}>
              {" "}
              xzcxzcXZCxzcXZCxz d fdsModoal body{" "}
            </Text>
            <View flexDirection="row" justifyContent="center">
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  console.log("garlaa");
                  props.hidemodal();
                }}
              >
                <Text> Яах санаатай </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{}} onPress={props.hidemodal}>
                <Text> Санаатай </Text>
              </TouchableOpacity>
            </View>
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
