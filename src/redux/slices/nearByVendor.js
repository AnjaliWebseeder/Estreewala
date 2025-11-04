import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";
import {GET_NEARBY_VENDORS} from "../../services/api"

// Get Nearby Vendors - NO TOKEN PARAMS NEEDED!
export const getNearbyVendors = createAsyncThunk(
  "vendor/getNearbyVendors",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📍 Fetching nearby vendors...");
      
      const response = await axiosInstance.get(GET_NEARBY_VENDORS, {
        timeout: 10000,
      });

      console.log("✅ Get Nearby Vendors Response:", response.data);
      
      // Handle different response structures
      if (response.data.vendors) {
        return response.data.vendors; // Return vendors array directly
      } else if (Array.isArray(response.data)) {
        return response.data; // If response is already an array
      } else {
        return []; // Fallback to empty array
      }
      
    } catch (error) {
      console.log("❌ Get Nearby Vendors Error:", error);
      
      let errorMessage = "Failed to fetch nearby vendors";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    // Vendors List
    vendors: [],
    vendorsLoading: false,
    vendorsError: null,
    
    // Selected Vendor
    selectedVendor: null,
  },
  reducers: {
    resetVendorState: (state) => {
      state.vendorsLoading = false;
      state.vendorsError = null;
    },
    clearVendorErrors: (state) => {
      state.vendorsError = null;
    },
    setSelectedVendor: (state, action) => {
      state.selectedVendor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Nearby Vendors
      .addCase(getNearbyVendors.pending, (state) => {
        state.vendorsLoading = true;
        state.vendorsError = null;
      })
      .addCase(getNearbyVendors.fulfilled, (state, action) => {
        state.vendorsLoading = false;
        state.vendors = action.payload || [];
        console.log("VENDORS FETCHED SUCCESSFULLY => ", action.payload);
      })
      .addCase(getNearbyVendors.rejected, (state, action) => {
        state.vendorsLoading = false;
        state.vendorsError = action.payload;
        console.log("VENDORS FETCH FAILED => ", action.payload);
      });
  },
});

export const { 
  resetVendorState,
  clearVendorErrors,
  setSelectedVendor,
} = vendorSlice.actions;

export default vendorSlice.reducer;