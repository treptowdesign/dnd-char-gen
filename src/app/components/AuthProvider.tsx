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
    const token = getCookie('chargen_authToken_client');
    const storedUser = getCookie('chargen_user_client');
  
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
    setCookie('chargen_user_client', JSON.stringify(user), { maxAge: 60 * 60 * 24 });
    setCookie('chargen_authToken_client', token, { maxAge: 60 * 60 * 24, httpOnly: false }); 
  };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' }); // call route to clear server cookie
    setUser(null);
    deleteCookie('chargen_user_client');
    deleteCookie('chargen_authToken_client');
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
