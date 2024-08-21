'use client'
import React, { createContext , useContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ login: false, email: '', password: '', type: '' });
  const [admin, setAdmin] = useState({ login: false, email: '', password: '', type: '' });
  const [petShopCategory, setPetShopCategory] = useState('All');
  
  useEffect(() => {
    // Check if there is any petworldUser named data available
    const storedUser = localStorage.getItem('petworldUser');
    const storedAdmin = localStorage.getItem('petworldAdmin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAdmin) {
      setAdmin(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser ,admin, setAdmin, petShopCategory, setPetShopCategory}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = ()=> useContext(UserContext)
