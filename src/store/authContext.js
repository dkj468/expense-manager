import React, { useState, useContext, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const setLoggedInUser = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const IsLoggedIn = () => {
    // const thisUser = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // check if email is verified
      if (!user.emailVerified) {
        return false;
      }
      // check if token is not expired
      if (!(user.expirationTime > new Date().getTime())) {
        return false;
      }
      // setUser(user);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    console.log("inside context - " + new Date());
    const thisUser = JSON.parse(localStorage.getItem("user"));
    if (thisUser) {
      setUser(thisUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, IsLoggedIn, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
