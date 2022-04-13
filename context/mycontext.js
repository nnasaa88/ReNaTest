import React, { useState } from "react";

const Mycontext = React.createContext();
import { getData } from "../scr/screens/Signupscreen";

export const Mystore = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [Username, setUsername] = useState(getData("Username"));
  console.log(Username);

  return (
    <Mycontext.Provider
      value={{ isLoggedIn, setisLoggedIn, Username, setUsername }}
    >
      {props.children}
    </Mycontext.Provider>
  );
};

export default Mycontext;
