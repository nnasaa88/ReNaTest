import React, { useState } from "react";

const Mycontext = React.createContext();
import { Getdata } from "../scr/screens/Signupscreen";

export const Mystore = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [Storemobile, setStoremobile] = useState("");
  const [Storename, setStorename] = useState("Username");
  const [Storepass, setStorepass] = useState("z");
  const [IsLoading, setIsLoading] = useState(true);
  const [Rezultdb, setRezultdb] = useState("");

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
        Rezultdb,
        setRezultdb,
      }}
    >
      {props.children}
    </Mycontext.Provider>
  );
};

export default Mycontext;
