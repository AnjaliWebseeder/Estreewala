// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppLaunchStatus, setAppLaunched } from './appLaunchStatus';

const AuthContext = createContext();

// Create a global token access function with better management
let globalToken = null;
let globalUserDetails = null;
let globalTokenListeners = [];

export const setGlobalAuth = (token, userDetails) => {
  globalToken = token;
  globalUserDetails = userDetails;
  console.log('🔐 Global auth updated:', { token: !!token, userDetails: !!userDetails });

  // Notify all listeners about token change
  globalTokenListeners.forEach(listener => listener(token));
};

export const getGlobalToken = () => {
  console.log('🔐 Getting global token:', !!globalToken);
  return globalToken;
};

export const getGlobalUserDetails = () => {
  return globalUserDetails;
};

export const clearGlobalAuth = () => {
  globalToken = null;
  globalUserDetails = null;
  console.log('🔐 Global auth cleared');

  // Notify all listeners about token removal
  globalTokenListeners.forEach(listener => listener(null));
};

// Add listener for token changes (useful for axios interceptor)
export const addTokenListener = (listener) => {
  globalTokenListeners.push(listener);
  return () => {
    const index = globalTokenListeners.indexOf(listener);
    if (index > -1) {
      globalTokenListeners.splice(index, 1);
    }
  };
};


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const loadStorageData = useCallback(async () => {
    try {
      console.log('🔄 Loading storage data...');

      const [appLaunched, token, userData, locationData] = await Promise.all([
        getAppLaunchStatus(),
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('userDetails'),
        AsyncStorage.getItem('userLocation'),
      ]);

      setIsFirstLaunch(!appLaunched);

      console.log("🔐 Loaded Token:", !!token);
      console.log("👤 Loaded UserData:", !!userData);
      console.log("📍 Loaded Location:", !!locationData);

      if (token) {
        setUserToken(token);
        setGlobalAuth(token, userData ? JSON.parse(userData) : null);
      }

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserDetails(parsedUser);
        // Ensure global auth has both token and user details
        if (token) {
          setGlobalAuth(token, parsedUser);
        }
      }

      if (locationData) {
        const parsedLocation = JSON.parse(locationData);
        setUserLocation(parsedLocation);
      }

    } catch (error) {
      console.log('❌ Error loading storage data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    loadStorageData();
  }, [loadStorageData]);


  const login = async (token, customer) => {
    try {
      console.log('🔄 Auth Context: login called');

      // Validate inputs
      if (!token) {
        throw new Error('Token is required for login');
      }

      if (!customer) {
        throw new Error('User details are required for login');
      }

      // Set AsyncStorage first
      await Promise.all([
        AsyncStorage.setItem('userToken', token),
        AsyncStorage.setItem('userDetails', JSON.stringify(customer)),
      ]);

      // Then update state and global auth
      setUserToken(token);
      setUserDetails(customer);
      setGlobalAuth(token, customer); // Update global auth

      console.log('✅ Login successful - token and user details saved');
    } catch (error) {
      console.log('❌ Login error:', error);
      throw error;
    }
  };

  const markAppAsLaunched = async () => {
    await setAppLaunched();
    setIsFirstLaunch(false);
  };

  const saveLocation = async (addressData) => {
    try {
      await AsyncStorage.setItem('userLocation', JSON.stringify(addressData));
      console.log("✅ Saved Location:", addressData);
      setUserLocation(addressData);
    } catch (error) {
      console.log('❌ Save location error:', error);
      throw error;
    }
  };



  const saveUserDetails = async (user) => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(user));
      setUserDetails(user);
      // Update global auth with current token and new user details
      if (userToken) {
        setGlobalAuth(userToken, user);
      }
    } catch (error) {
      console.log('Error saving user details:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userDetails', 'userLocation']);
      setUserToken(null);
      setUserDetails(null);
      setUserLocation(null);
      setGlobalAuth(null, null); // clear axios token
    } catch (error) {
      console.log("❌ Logout error:", error);
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
      userDetails,
      saveUserDetails,
      reloadAuth: loadStorageData
    }}>
      {children}
    </AuthContext.Provider>
  );
};