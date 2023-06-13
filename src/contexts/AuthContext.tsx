import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../typings";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

interface AuthState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const mockUser = {
  username: "admin",
  password: "admin", // This w0uld be a hashed password in a real system.
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
      });
    
      useEffect(() => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      }, [user]);
    

  const login = (username: string, password: string) => {
    if (username === mockUser.username && password === mockUser.password) {
        const payload = { username, password };

        // mock token creation by just stringifying the payload
        const token = JSON.stringify(payload); 

        // set token in local storage
        localStorage.setItem("authToken", token);

        // set user in the state
        setUser(payload);
        return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
