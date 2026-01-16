import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosConfig';
import { GET_NEARBY_VENDORS } from '../../services/api';

// Get Nearby Vendors - NO TOKEN PARAMS NEEDED!
export const getNearbyVendors = createAsyncThunk(
  'vendor/getNearbyVendors',
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      if (!lat || !lng) {
        throw new Error('Latitude and Longitude are required');
      }

      console.log('📍 Fetching nearby vendors with lat/lng:', lat, lng);

      const response = await axiosInstance.get(
        `${GET_NEARBY_VENDORS}/latlng`,
        {
          params: { lat, lng },
          timeout: 10000,
        }
      );

      console.log('✅ Get Nearby Vendors Response:', response.data);

      if (response.data?.vendors) {
        return response.data.vendors;
      }

      if (Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    } catch (error) {
      console.log('❌ Get Nearby Vendors Error:', error);

      let errorMessage = 'Failed to fetch nearby vendors';

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


export const getVendorCatalog = createAsyncThunk(
  'vendor/getVendorCatalog',
  async (vendorId, { getState, rejectWithValue }) => {
    try {
      console.log('📦 Fetching vendor catalog for ID:', vendorId);
        const response = await axiosInstance.get(`https://api.estreewalla.com/api/v1/customers/vendor-catalog/${vendorId}`,
        {
        timeout: 10000,
      });

      console.log('✅ Vendor Catalog Response:', response.data);
      return response.data;
    } catch (error) {
      console.log('❌ Vendor Catalog Error:', error);
      let errorMessage = 'Failed to fetch vendor catalog';

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
  },
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    // Vendors List
    vendors: [],
    vendorsLoading: false,
    vendorsError: null,

    // Selected Vendor
    selectedVendor: null,

    // 👇 new fields for vendor catalog
    vendorCatalog: null,
    vendorCatalogLoading: false,
    vendorCatalogError: null,

    // 👇 NEW: Real-time updates tracking
    lastUpdateTime: null,
    updateSource: 'initial', // 'initial' | 'socket' | 'manual'
    totalUpdates: 0,
  },
  reducers: {
    resetVendorState: state => {
      state.vendorsLoading = false;
      state.vendorsError = null;
    },
    clearVendorErrors: state => {
      state.vendorsError = null;
    },
    setSelectedVendor: (state, action) => {
      state.selectedVendor = action.payload;
    },

    // 👇 NEW: Real-time vendor updates
    updateNearbyVendors: (state, action) => {
      console.log('🔄 Updating vendors via socket:', action.payload);
      
      const { vendors, location, timestamp } = action.payload;
      
      if (vendors && Array.isArray(vendors)) {
        // Replace the entire vendors list with new data
        state.vendors = vendors;
        state.lastUpdateTime = timestamp || new Date().toISOString();
        state.updateSource = 'socket';
        state.totalUpdates += 1;
        
        console.log('✅ Vendors updated via socket. Total vendors:', vendors.length);
        console.log('📍 Location:', location);
        console.log('🕒 Last update:', state.lastUpdateTime);
      } else {
        console.error('❌ Invalid vendors data in updateNearbyVendors');
      }
    },

    // 👇 NEW: Update single vendor status (online/offline)
    updateVendorStatus: (state, action) => {
      const { vendorId, isOnline, lastSeen } = action.payload;
      
      const vendorIndex = state.vendors.findIndex(vendor => vendor.id === vendorId);
      
      if (vendorIndex !== -1) {
        state.vendors[vendorIndex] = {
          ...state.vendors[vendorIndex],
          isOnline,
          lastSeen: lastSeen || new Date().toISOString()
        };
        
        console.log(`✅ Vendor ${vendorId} status updated: ${isOnline ? 'online' : 'offline'}`);
      } else {
        console.log(`⚠️ Vendor ${vendorId} not found in list for status update`);
      }
    },

    // 👇 NEW: Add a single vendor (when new vendor comes online)
    addVendor: (state, action) => {
      const newVendor = action.payload;
      
      // Check if vendor already exists
      const existingIndex = state.vendors.findIndex(vendor => vendor.id === newVendor.id);
      
      if (existingIndex === -1) {
        // Add new vendor to the beginning of the list
        state.vendors.unshift(newVendor);
        console.log('✅ New vendor added:', newVendor.businessName);
      } else {
        // Update existing vendor
        state.vendors[existingIndex] = { ...state.vendors[existingIndex], ...newVendor };
        console.log('✅ Existing vendor updated:', newVendor.businessName);
      }
      
      state.lastUpdateTime = new Date().toISOString();
      state.updateSource = 'socket';
    },

    // 👇 NEW: Remove a vendor (when vendor goes offline)
    removeVendor: (state, action) => {
      const vendorId = action.payload;
      
      state.vendors = state.vendors.filter(vendor => vendor.id !== vendorId);
      state.lastUpdateTime = new Date().toISOString();
      
      console.log(`✅ Vendor ${vendorId} removed from list`);
    },

    // 👇 NEW: Clear all vendors (reset)
    clearVendors: state => {
      state.vendors = [];
      state.lastUpdateTime = new Date().toISOString();
      console.log('✅ All vendors cleared');
    },

    // 👇 NEW: Manual refresh tracking
    setManualRefresh: state => {
      state.updateSource = 'manual';
      state.lastUpdateTime = new Date().toISOString();
    },
  },
  extraReducers: builder => {
    builder
      // Get Nearby Vendors
      .addCase(getNearbyVendors.pending, state => {
        state.vendorsLoading = true;
        state.vendorsError = null;
      })
      .addCase(getNearbyVendors.fulfilled, (state, action) => {
        state.vendorsLoading = false;
        state.vendors = action.payload || [];
        state.lastUpdateTime = new Date().toISOString();
        state.updateSource = 'initial';
        console.log('VENDORS FETCHED SUCCESSFULLY => ', action.payload);
      })
      .addCase(getNearbyVendors.rejected, (state, action) => {
        state.vendorsLoading = false;
        state.vendorsError = action.payload;
        console.log('VENDORS FETCH FAILED => ', action.payload);
      })

      // Get Vendor Catalog
      .addCase(getVendorCatalog.pending, state => {
        state.vendorCatalogLoading = true;
        state.vendorCatalogError = null;
        state.vendorCatalog = null;
      })
      .addCase(getVendorCatalog.fulfilled, (state, action) => {
        state.vendorCatalogLoading = false;
        state.vendorCatalog = action.payload;
      })
      .addCase(getVendorCatalog.rejected, (state, action) => {
        state.vendorCatalogLoading = false;
        state.vendorCatalogError = action.payload;
      });
  },
});

export const { 
  resetVendorState, 
  clearVendorErrors, 
  setSelectedVendor,
  
  // 👇 Export the new real-time actions
  updateNearbyVendors,
  updateVendorStatus,
  addVendor,
  removeVendor,
  clearVendors,
  setManualRefresh
} = vendorSlice.actions;

export default vendorSlice.reducer;