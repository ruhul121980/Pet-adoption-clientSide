'use client'
import React, { createContext , useContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ login: false, email: '', password: '', type: '' });

  useEffect(() => {
    // Check if there is any petworldUser named data available
    const storedUser = localStorage.getItem('petworldUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = ()=> useContext(UserContext)
