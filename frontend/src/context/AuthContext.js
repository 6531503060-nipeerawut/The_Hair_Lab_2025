import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  const login = (role, userData) => {
    setIsLoggedIn(true);
    setIsAdmin(role === "admin");
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
