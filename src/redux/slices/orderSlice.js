import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosConfig';

// ✅ Place Order API Thunk
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { getState, rejectWithValue }) => {
    try {
      console.log('🧾 Placing order with data:', orderData);

      const token = getState()?.auth?.token;
      if (!token) throw new Error('No token found. Please log in again.');

      const response = await axiosInstance.post(
        'https://api.estreewalla.com/api/v1/customers/orders',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        },
      );

      console.log('✅ Order placed successfully:', response.data);
      return response.data;
    } catch (error) {
      console.log('❌ Place Order Error:', error);

      let errorMessage = 'Failed to place order';

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

// ✅ Slice Definition
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: null, // latest placed order details
    orderLoading: false, // loading state
    orderError: null, // error message
    orderSuccess: false, // success flag
  },
  reducers: {
    resetOrderState: state => {
      state.orderLoading = false;
      state.orderError = null;
      state.orderSuccess = false;
      state.orderData = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(placeOrder.pending, state => {
        state.orderLoading = true;
        state.orderError = null;
        state.orderSuccess = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderData = action.payload;
        state.orderSuccess = true;
        console.log('🟢 ORDER PLACED SUCCESSFULLY:', action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
        state.orderSuccess = false;
        console.log('🔴 ORDER FAILED:', action.payload);
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
