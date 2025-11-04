// services/apiInterceptor.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../redux/store"
import { BASE_URL } from './api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    try {
      // Get token from Redux store or AsyncStorage
      const token = store.getState()?.auth?.token || await AsyncStorage.getItem('userToken');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, logout user
      const { logout } = require('../hooks/useAuth');
      // You might need to adjust this based on your logout implementation
      // logout();
    }
    return Promise.reject(error);
  }
);

export default api;