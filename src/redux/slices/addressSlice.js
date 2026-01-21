import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosConfig";
import {
  GET_ADDRESSES,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_DEFAULT_ADDRESS,
} from "../../services/api";

/* ===================== GET ===================== */
export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(GET_ADDRESSES, {
        timeout: 10000,
      });

      return {
        addresses: response.data?.addresses || response.data || [],
        message: response.data?.message || null,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch addresses" }
      );
    }
  }
);

/* ===================== ADD ===================== */
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(ADD_ADDRESS, addressData, {
        timeout: 10000,
      });

      // always refresh list
      await dispatch(getAddresses());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add address" }
      );
    }
  }
);

/* ===================== UPDATE ===================== */
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(
        UPDATE_ADDRESS(id),
        addressData,
        { timeout: 10000 }
      );

      await dispatch(getAddresses());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update address" }
      );
    }
  }
);

/* ===================== DELETE ===================== */
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(DELETE_ADDRESS(id), {
        timeout: 10000,
      });

      return {
        id,
        message: response.data?.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete address" }
      );
    }
  }
);

/* ===================== SET DEFAULT ===================== */
export const setDefaultAddress = createAsyncThunk(
  "address/setDefault",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        SET_DEFAULT_ADDRESS(id),
        {},
        { timeout: 10000 }
      );

      return {
        id,
        message: response.data?.message,
        addresses: response.data?.addresses,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to set default address" }
      );
    }
  }
);

const initialState = {
  addresses: [],
  selectedAddress: null,

  addressesLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  setDefaultLoading: false,

  addressesError: null,
  addError: null,
  updateError: null,
  deleteError: null,
  setDefaultError: null,

  apiMessage: null,
};


/* ===================== SLICE ===================== */
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddressState: (state) => {
      state.addressesError = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
      state.setDefaultError = null;
      state.apiMessage = null;
    },

    clearAddressState: () => initialState, 

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- GET ---------- */
      .addCase(getAddresses.pending, (state) => {
        state.addressesLoading = true;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.addresses;

        if (!state.selectedAddress) {
          const def = state.addresses.find(a => a.isDefault);
          if (def) state.selectedAddress = def;
        }
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.addressesLoading = false;
        state.addressesError = action.payload?.message;
      })

      /* ---------- ADD ---------- */
      .addCase(addAddress.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addLoading = false;
        state.apiMessage = action.payload?.message;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload?.message;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateAddress.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.apiMessage = action.payload?.message;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload?.message;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteAddress.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.addresses = state.addresses.filter(
          (a) => a._id !== action.payload.id
        );

        if (state.selectedAddress?._id === action.payload.id) {
          state.selectedAddress = null;
        }

        state.apiMessage = action.payload.message;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload?.message;
      })

      /* ---------- SET DEFAULT ---------- */
      .addCase(setDefaultAddress.pending, (state) => {
        state.setDefaultLoading = true;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.setDefaultLoading = false;

        if (Array.isArray(action.payload.addresses)) {
          state.addresses = action.payload.addresses;
        }

        const selected = state.addresses.find(
          (a) => a._id === action.payload.id
        );

        state.selectedAddress = selected || null;
        state.apiMessage = action.payload.message;
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.setDefaultLoading = false;
        state.setDefaultError = action.payload?.message;
      });
  },
});

export const { resetAddressState, setSelectedAddress ,clearAddressState  } =
  addressSlice.actions;

export default addressSlice.reducer;
