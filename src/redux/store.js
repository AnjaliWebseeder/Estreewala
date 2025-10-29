import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice"
import addressReducer from "../redux/slices/addressSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
  },
});

export default store;