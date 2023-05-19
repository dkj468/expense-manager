import React, { useState, useContext } from "react";

export const CustomContext = React.createContext();

export const CustomContextProvider = ({ children }) => {
  const [showMenu, setIsShowMenu] = useState(undefined);

  return (
    <CustomContext.Provider value={{ showMenu, setIsShowMenu }}>
      {children}
    </CustomContext.Provider>
  );
};

export const useCustomContext = () => {
  return useContext(CustomContext);
};
