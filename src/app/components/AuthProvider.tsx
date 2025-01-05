'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User, token: string) => void; 
  logout: () => void; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children: React.ReactNode }) { 
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    // check for stored user session in cookies
    const token = getCookie('authToken');
    const storedUser = getCookie('user');
  
    if (token && typeof storedUser === 'string') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from cookie:', error);
      }
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setCookie('authToken', token, { maxAge: 60 * 60 * 24, httpOnly: false });
    setCookie('user', JSON.stringify(user), { maxAge: 60 * 60 * 24 });
  };

  const logout = () => {
    setUser(null);
    deleteCookie('authToken');
    deleteCookie('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
