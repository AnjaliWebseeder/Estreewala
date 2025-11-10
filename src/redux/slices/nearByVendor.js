import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosConfig';
import { GET_NEARBY_VENDORS } from '../../services/api';

// Get Nearby Vendors - NO TOKEN PARAMS NEEDED!
export const getNearbyVendors = createAsyncThunk(
  'vendor/getNearbyVendors',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📍 Fetching nearby vendors...');

      const response = await axiosInstance.get(GET_NEARBY_VENDORS, {
        timeout: 10000,
      });

      console.log('✅ Get Nearby Vendors Response:', response.data);

      // Handle different response structures
      if (response.data.vendors) {
        return response.data.vendors; // Return vendors array directly
      } else if (Array.isArray(response.data)) {
        return response.data; // If response is already an array
      } else {
        return []; // Fallback to empty array
      }
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
  },
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

export const { resetVendorState, clearVendorErrors, setSelectedVendor } =
  vendorSlice.actions;

export default vendorSlice.reducer;
