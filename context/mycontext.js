import React, { useState } from "react";

const Mycontext = React.createContext();
import { Getdata } from "../scr/screens/Signupscreen";

export const Mystore = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [Storemobile, setStoremobile] = useState("");
  const [Storename, setStorename] = useState("Username");
  const [Storepass, setStorepass] = useState("dddddddz");
  const [IsLoading, setIsLoading] = useState(true);
  const [Userinfo, setUserinfo] = useState({});
  const [Activetype, setActivetype] = useState("");

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
      }}
    >
      {props.children}
    </Mycontext.Provider>
  );
};

export default Mycontext;
