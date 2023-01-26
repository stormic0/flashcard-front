import { createContext, useContext, useState } from "react";

const LoginContext = createContext(undefined);

const LoginContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || '');

  const tokenHandler = (data) => {
    setToken(data);
    sessionStorage.setItem("token", data);
  };

  return <LoginContext.Provider value={{ token, tokenHandler }}>{children}</LoginContext.Provider>;
};

const useLoginContext = () => {
  const values = useContext(LoginContext);

  if (values === undefined) {
    throw new Error("F".repeat(20));
  }

  return values;
};

export { LoginContextProvider, useLoginContext };
