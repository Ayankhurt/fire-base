import React, { createContext, useReducer } from "react";
import { reducer } from "./Reducer";
import { getAuth, signOut } from "firebase/auth";

export const GlobalContext = createContext("Initial Value");

let data = {
  user: {},
  isLogin: null,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);
  const logout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        dispatch({ type: "USER_LOGOUT" });
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.log("Error during signout", error);
      });
  };
  return (
    <GlobalContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}
