import React, { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//amaras comment dwad awdwad
// import {createNativeStackNavigator, HeaderBackButton,} from "@react-navigation/native-stack";
import Stacknav from "./scr/screens/Stacknav";
// import Drawernav from "./scr/screens/DrawerNav";
import { Mystore, fdate } from "./context/Mycontext";
import { initdb } from "./database/db";

export default function App() {
  useEffect(() => {
    initdb(
      "create table if not exists items (id integer primary key not null, type text,sex text,im text,tamga text,name text,color text,image text,qty int,desc text,start text,finish text,mygroup int,helder text,status text,created text,modified text, isbackup text);"
    )
      .then((result) => console.log("Items бэлдлээ"))
      .catch((err) => console.log("Items асуудал гарлаа." + err.message));
    initdb(
      "create table if not exists events (id integer primary key not null, itemsId text,event text,desc text,date text,created text,modified text, isbackup text );"
    )
      .then((result) => console.log("Event db бэлдлээ"))
      .catch((err) => console.log("Event асуудал гарлаа." + err.message));
    initdb(
      "create table if not exists config (id integer primary key not null, ename text,mname text,value text,value1 text,value2 text,value3 text,Desc text,isbackup text,created text,user text);"
    )
      .then((result) => console.log("config db бэлдлээ"))
      .catch((err) => console.log("Event асуудал гарлаа." + err.message));
  }, []);

  return (
    <NavigationContainer>
      <Mystore>
        <Stacknav />
        {/* <Drawernav /> */}
      </Mystore>
    </NavigationContainer>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mytext: { fontSize: 18, color: "red" },
});
