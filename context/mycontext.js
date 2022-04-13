import React, { useState } from "react";

const Mycontext = React.createContext();
import { Getdata } from "../scr/screens/Signupscreen";

export const Mystore = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [Storename, setStorename] = useState("Username");
  const [Storepass, setStorepass] = useState("z");

  return (
    <Mycontext.Provider
      value={{
        isLoggedIn,
        setisLoggedIn,
        Storename,
        setStorename,
        Storepass,
        setStorepass,
      }}
    >
      {props.children}
    </Mycontext.Provider>
  );
};

export default Mycontext;
