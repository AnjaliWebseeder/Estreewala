// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppLaunchStatus, setAppLaunched } from './appLaunchStatus';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
          const firstLaunch = !(await getAppLaunchStatus());
          setIsFirstLaunch(firstLaunch);
        const [token, location] = await Promise.all([
          AsyncStorage.getItem('userToken'),
          AsyncStorage.getItem('userLocation')
        ]);
        
        setUserToken(token);
        
        if (location) {
          setUserLocation(JSON.parse(location));
        }
      } catch (error) {
        console.log('Error loading storage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

    const markAppAsLaunched = async () => {
    await setAppLaunched();
    setIsFirstLaunch(false);
  };

  const saveLocation = async (location) => {
    try {
      await AsyncStorage.setItem('userLocation', JSON.stringify(location));
      console.log("Location is",location)
      setUserLocation(location);
    } catch (error) {
      console.log('Save location error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userLocation')
      ]);
      setUserToken(null);
      setUserLocation(null);
    } catch (error) {
      console.log('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      userToken, 
      userLocation, 
      login, 
      logout, 
      saveLocation, 
      isLoading,
      markAppAsLaunched,
      isFirstLaunch,
    }}>
      {children}
    </AuthContext.Provider>
  );
};