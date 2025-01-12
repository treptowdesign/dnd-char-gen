"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {

    const storedData = getCookie("chargen_authToken_client");

    if (storedData && typeof storedData === "string") {
      try { // try parsing the stored JSON data
        const parsedData = JSON.parse(storedData);
        if (parsedData?.user && parsedData?.token) {
          setUser(parsedData.user);
          setToken(parsedData.token);
        }
      } catch (error) {
        console.error("Error parsing auth token from cookie:", error);
      }
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    setCookie("chargen_authToken_client", JSON.stringify({ user, token }), {
      maxAge: 60 * 60 * 24, // 1-day expiration
      httpOnly: false,
    });
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" }); // call server to clear cookie
    setUser(null);
    setToken(null);
    deleteCookie("chargen_authToken_client"); // remove the combined cookie
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
