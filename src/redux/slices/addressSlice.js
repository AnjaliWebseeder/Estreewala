import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_ADDRESSES, ADD_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS } from "../../services/api"

// Get Addresses
export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      console.log("🏠 Fetching addresses...");
      
      const response = await axios.get(GET_ADDRESSES, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        timeout: 10000,
      });

      console.log("✅ Get Addresses Response:", response.data);
      
      // Handle different response structures
      if (response.data.addresses) {
        return response.data.addresses; // Return addresses array directly
      } else if (Array.isArray(response.data)) {
        return response.data; // If response is already an array
      } else {
        return []; // Fallback to empty array
      }
      
    } catch (error) {
      console.log("❌ Get Addresses Error:", error);
      
      let errorMessage = "Failed to fetch addresses";
      
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

// Add Address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      console.log("➕ Adding address:", addressData);
      
      const response = await axios.post(ADD_ADDRESS, addressData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        timeout: 10000,
      });

      console.log("✅ Add Address Response:", response.data);
      
      // Handle different response structures
      if (response.data.address) {
        return response.data.address; // If response has address object
      } else if (response.data.addresses && Array.isArray(response.data.addresses)) {
        // If response returns all addresses, return the last one (newly added)
        return response.data.addresses[response.data.addresses.length - 1];
      } else {
        // Create a mock address with ID if API doesn't return the created address
        return {
          _id: Date.now().toString(), // Temporary ID
          ...addressData,
          createdAt: new Date().toISOString()
        };
      }
      
    } catch (error) {
      console.log("❌ Add Address Error:", error);
      
      let errorMessage = "Failed to add address";
      
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

// Update Address - FIXED VERSION
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      console.log("✏️ Updating address:", id, addressData);
      
      const response = await axios.put(UPDATE_ADDRESS(id), addressData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        timeout: 10000,
      });

      console.log("✅ Update Address Response:", response.data);
      
      await dispatch(getAddresses());
      
      // Return the updated address data for immediate UI update
      return {
        _id: id,
        ...addressData
      };
      
    } catch (error) {
      console.log("❌ Update Address Error:", error);
      
      let errorMessage = "Failed to update address";
      
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

// Delete Address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      console.log("🗑️ Deleting address:", id);
      
      await axios.delete(DELETE_ADDRESS(id), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        timeout: 10000,
      });

      console.log("✅ Delete Address Success");
      return id; // Return the deleted address ID
      
    } catch (error) {
      console.log("❌ Delete Address Error:", error);
      
      let errorMessage = "Failed to delete address";
      
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

const addressSlice = createSlice({
  name: "address",
  initialState: {
    // Address List
    addresses: [],
    addressesLoading: false,
    addressesError: null,
    
    // Add Address
    addLoading: false,
    addSuccess: false,
    addError: null,
    
    // Update Address
    updateLoading: false,
    updateSuccess: false,
    updateError: null,
    
    // Delete Address
    deleteLoading: false,
    deleteSuccess: false,
    deleteError: null,
    
    // Selected Address
    selectedAddress: null,
  },
  reducers: {
    resetAddressState: (state) => {
      state.addressesLoading = false;
      state.addressesError = null;
      state.addLoading = false;
      state.addSuccess = false;
      state.addError = null;
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = null;
    },
    resetAddAddressState: (state) => {
      state.addLoading = false;
      state.addSuccess = false;
      state.addError = null;
    },
    resetUpdateAddressState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;
    },
    resetDeleteAddressState: (state) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = null;
    },
    clearAddressErrors: (state) => {
      state.addressesError = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Addresses
      .addCase(getAddresses.pending, (state) => {
        state.addressesLoading = true;
        state.addressesError = null;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addressesLoading = false;
        state.addresses = action.payload || [];
        console.log("ADDRESSES FETCHED SUCCESSFULLY => ", action.payload);
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.addressesLoading = false;
        state.addressesError = action.payload;
        console.log("ADDRESSES FETCH FAILED => ", action.payload);
      })
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
        state.addSuccess = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addSuccess = true;
        state.addError = null;
        
        // Safely add the address to the array
        if (action.payload && state.addresses) {
          // Check if address already exists to avoid duplicates
          const existingIndex = state.addresses.findIndex(
            addr => addr._id === action.payload._id
          );
          
          if (existingIndex === -1) {
            state.addresses.push(action.payload);
          } else {
            // Update existing address
            state.addresses[existingIndex] = action.payload;
          }
        }
        
        console.log("ADDRESS ADDED SUCCESSFULLY => ", action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.addLoading = false;
        state.addSuccess = false;
        state.addError = action.payload;
        console.log("ADDRESS ADD FAILED => ", action.payload);
      })
      // Update Address - FIXED
      .addCase(updateAddress.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.updateError = null;
        
        // Update the address in the local state immediately
        if (action.payload && state.addresses) {
          const index = state.addresses.findIndex(addr => addr._id === action.payload._id);
          if (index !== -1) {
            state.addresses[index] = { 
              ...state.addresses[index], 
              ...action.payload 
            };
          }
        }
        
        console.log("ADDRESS UPDATED SUCCESSFULLY => ", action.payload);
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.updateError = action.payload;
        console.log("ADDRESS UPDATE FAILED => ", action.payload);
      })
      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.deleteError = null;
        
        if (state.addresses) {
          state.addresses = state.addresses.filter(addr => addr._id !== action.payload);
          if (state.selectedAddress === action.payload) {
            state.selectedAddress = null;
          }
        }
        
        console.log("ADDRESS DELETED SUCCESSFULLY => ", action.payload);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = false;
        state.deleteError = action.payload;
        console.log("ADDRESS DELETE FAILED => ", action.payload);
      });
  },
});

export const { 
  resetAddressState,
  resetAddAddressState,
  resetUpdateAddressState,
  resetDeleteAddressState,
  clearAddressErrors,
  setSelectedAddress,
} = addressSlice.actions;

export default addressSlice.reducer;