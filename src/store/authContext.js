import React, { useState, useContext } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const login = (email) => {
    // setUser({
    //   ...user,
    //   email: email,
    //   isLoggedIn: true,
    // });
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
