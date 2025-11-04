import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice"
import addressReducer from "../redux/slices/addressSlice"
import nearByVendorReducer from "../redux/slices/nearByVendor"

const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    nearByVendor:nearByVendorReducer
  },
});

export default store;