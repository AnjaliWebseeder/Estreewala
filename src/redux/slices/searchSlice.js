// redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig"
import {SEARCH_VENDORS_API} from "../../services/api"
// Search Vendors
export const searchVendors = createAsyncThunk(
  "search/searchVendors",
  async (searchQuery, { rejectWithValue }) => {
    try {
      console.log("🔍 Searching vendors with query:", searchQuery);
      
      if (!searchQuery || searchQuery.trim() === '') {
        return []; // Return empty array for empty search
      }

      const response = await axiosInstance.get(SEARCH_VENDORS_API, {
        params: { q: searchQuery },
        timeout: 10000,
      });

      console.log("✅ Search Vendors Response:", response.data);
      
      // Handle different response structures
      if (response.data.vendors) {
        return response.data.vendors;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        return [];
      }
      
    } catch (error) {
      console.log("❌ Search Vendors Error:", error);
      
      let errorMessage = "Failed to search vendors";
      
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

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    searchLoading: false,
    searchError: null,
    lastSearchQuery: "",
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
      state.lastSearchQuery = "";
    },
    clearSearchError: (state) => {
      state.searchError = null;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search Vendors
      .addCase(searchVendors.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchVendors.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload || [];
        state.searchError = null;
        console.log("SEARCH RESULTS FETCHED SUCCESSFULLY => ", action.payload);
      })
      .addCase(searchVendors.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
        state.searchResults = [];
        console.log("SEARCH FAILED => ", action.payload);
      });
  },
});

export const { 
  clearSearchResults,
  clearSearchError,
  setSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;