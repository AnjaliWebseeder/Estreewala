// src/navigation/customDrawer/drawerContext.js
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <DrawerContext.Provider value={{ 
      isOpen, 
      openDrawer, 
      closeDrawer, 
      toggleDrawer 
    }}>
      {children}
    </DrawerContext.Provider>
  );
};