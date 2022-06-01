import React, { useState } from "react";

const Mycontext = React.createContext();
// import { Getdata } from "../scr/screens/Signupscreen";

export const Mystore = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [Storeappid, setStoreappid] = useState("");
  const [Storemobile, setStoremobile] = useState("");
  const [Storename, setStorename] = useState("admin");
  const [Storepass, setStorepass] = useState("dddddddz");
  const [IsLoading, setIsLoading] = useState(true);
  const [Userinfo, setUserinfo] = useState({});
  const [Activetype, setActivetype] = useState("c");
  const [Closedfield, setClosedfield] = useState([
    { mname: "Төлөв", ename: "status" },
    { mname: "Им", ename: "im" },
    { mname: "Тамга", ename: "tamga" },
    { mname: "Малчин", ename: "helder" },
    { mname: "Бүлэг/Азарга", ename: "mygroup" },
    { mname: "Тэмдэгт газар", ename: "place" },
  ]);

  const [Im, setIm] = useState([
    "?",
    "Баруун тэвхэр Зүүн онь",
    "Баруун Зүүн тэвхэр",
  ]);
  const [Tamga, setTamga] = useState(["?", "Сар", "Нар"]);
  const [Helder, setHelder] = useState(["?", "Dorj", "Dondog"]);
  const [Mygroup, setMygroup] = useState(["?", "Хүрэн", "Хар азарга"]);
  const [Tuluv, setTuluv] = useState(["Амьд", "Борлуулсан"]);
  const [Event, setEvent] = useState("");

  return (
    <Mycontext.Provider
      value={{
        isLoggedIn,
        setisLoggedIn,
        Storename,
        setStorename,
        Storepass,
        setStorepass,
        IsLoading,
        setIsLoading,
        Storemobile,
        setStoremobile,
        Userinfo,
        setUserinfo,
        Activetype,
        setActivetype,
        Im,
        setIm,
        Tamga,
        setTamga,
        Helder,
        setHelder,
        Mygroup,
        setMygroup,
        Tuluv,
        setTuluv,
        Event,
        setEvent,
        Closedfield,
        setClosedfield,
        Storeappid,
        setStoreappid,
      }}
    >
      {props.children}
    </Mycontext.Provider>
  );
};

export const fdate = () => {
  let a = new Date().getMonth() + 1;
  let c = new Date().getDate();
  let d = new Date().getHours();
  let f = new Date().getMinutes();
  let b =
    new Date().getFullYear() +
    "-" +
    (a < 10 ? "0" + a : a) +
    "-" +
    (c < 10 ? "0" + c : c) +
    " " +
    (d < 10 ? "0" + d : d) +
    ":" +
    (f < 10 ? "0" + f : f);
  return b;
};

export default Mycontext;
