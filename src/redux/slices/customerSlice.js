import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../services/axiosConfig"
import {GET_CUSTOMERDETAILS} from "../../services/api"

// Async thunk to get customer details
export const getCustomerDetails = createAsyncThunk(
  'customer/getCustomerDetails',
  async (_, { rejectWithValue }) => {
    try {
      console.log('👤 Fetching customer details...');
      
      const response = await axiosInstance.get(
       GET_CUSTOMERDETAILS,
        {
          timeout: 10000,
        }
      );

      console.log('✅ Customer Details Response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.log('❌ Get Customer Details Error:', error);

      let errorMessage = 'Failed to fetch customer details';

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to update customer name only
export const updateCustomerName = createAsyncThunk(
  'customer/updateCustomerName',
  async (name, { rejectWithValue }) => {
    try {
      console.log('🔄 Updating customer name:', name);
      
      const updateData = { name: name.trim() };
      
      const response = await axiosInstance.patch(
        GET_CUSTOMERDETAILS,
        updateData,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Customer Name Update Response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.log('❌ Update Customer Name Error:', error);

      let errorMessage = 'Failed to update name';

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    // Customer data
    customerData: null,
    
    // Loading states
    loading: false,
    updatingName: false,
    
    // Error states
    error: null,
    updateNameError: null,
    
    // Success states
    updateNameSuccess: false,
  },
  reducers: {
    // Reset customer state
    resetCustomerState: (state) => {
      state.customerData = null;
      state.loading = false;
      state.updatingName = false;
      state.error = null;
      state.updateNameError = null;
      state.updateNameSuccess = false;
    },
    
    // Clear errors
    clearCustomerErrors: (state) => {
      state.error = null;
      state.updateNameError = null;
    },
    
    // Clear update success
    clearUpdateNameSuccess: (state) => {
      state.updateNameSuccess = false;
    },
    
    // Update customer name locally (for immediate UI updates)
    updateCustomerNameLocally: (state, action) => {
      if (state.customerData) {
        state.customerData.name = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Customer Details
      .addCase(getCustomerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.customerData = action.payload;
        state.error = null;
      })
      .addCase(getCustomerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.customerData = null;
      })
      
      // Update Customer Name
      .addCase(updateCustomerName.pending, (state) => {
        state.updatingName = true;
        state.updateNameError = null;
        state.updateNameSuccess = false;
      })
      .addCase(updateCustomerName.fulfilled, (state, action) => {
        state.updatingName = false;
        state.customerData = action.payload;
        state.updateNameError = null;
        state.updateNameSuccess = true;
      })
      .addCase(updateCustomerName.rejected, (state, action) => {
        state.updatingName = false;
        state.updateNameError = action.payload;
        state.updateNameSuccess = false;
      });
  },
});

export const {
  resetCustomerState,
  clearCustomerErrors,
  clearUpdateNameSuccess,
  updateCustomerNameLocally,
} = customerSlice.actions;

export default customerSlice.reducer;