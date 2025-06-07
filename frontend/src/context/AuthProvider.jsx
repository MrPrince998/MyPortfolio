import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("showLoginLink");
  };

  useEffect(()=> {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
    }
  })

  return (
    <authContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

const loggedIn = () => {
  const context = useContext(authContext);
  if (!context)
    throw new Error("useToggle must be used within a ToggleProvider");
  return context;
};

export { AuthProvider, loggedIn, authContext };
