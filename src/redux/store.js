import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import addressReducer from '../redux/slices/addressSlice';
import nearByVendorReducer from '../redux/slices/nearByVendor';
import orderReducer from '../redux/slices/orderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import cartReducer from '../redux/slices/cartSlice';
import myOrderReducer from '../redux/slices/myOrderSlice'
import customerReducer from "../redux/slices/customerSlice"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cart'], // ✅ only persist auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  address: addressReducer,
  nearByVendor: nearByVendorReducer,
  order: orderReducer,
  cart: cartReducer,
  myOrder: myOrderReducer,
  customer: customerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
