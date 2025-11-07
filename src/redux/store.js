import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import addressReducer from '../redux/slices/addressSlice';
import nearByVendorReducer from '../redux/slices/nearByVendor';
import orderReducer from '../redux/slices/orderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import cartReducer from '../redux/slices/cartSlice';

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     address: addressReducer,
//     nearByVendor: nearByVendorReducer,
//     order: orderReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
});

// export default store;

export const persistor = persistStore(store);
