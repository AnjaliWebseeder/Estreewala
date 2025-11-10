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

// ✅ Cancel Order API Thunk
export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async ({ orderId, reason }, { getState, rejectWithValue }) => {
    try {
      console.log('❌ Cancelling order:', orderId, 'with reason:', reason);

      const token = getState()?.auth?.token;
      if (!token) throw new Error('No token found. Please log in again.');

      const response = await axiosInstance.patch(
        `https://api.estreewalla.com/api/v1/customers/orders/${orderId}/cancel`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('✅ Order cancelled successfully:', response.data);
      return {
        orderId,
        data: response.data.data || response.data
      };
    } catch (error) {
      console.log('❌ Cancel Order Error:', error);

      let errorMessage = 'Failed to cancel order';

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

// ✅ Slice Definition
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: null, // latest placed order details
    orderLoading: false, // loading state for placing order
    orderError: null, // error message for placing order
    orderSuccess: false, // success flag for placing order
    
    // Cancel order states
    cancellingOrder: false, // loading state for cancelling order
    cancelError: null, // error message for cancelling order
    cancelSuccess: false, // success flag for cancelling order
    cancelledOrderId: null, // ID of the cancelled order
  },
  reducers: {
    resetOrderState: state => {
      state.orderLoading = false;
      state.orderError = null;
      state.orderSuccess = false;
      state.orderData = null;
    },
    resetCancelState: state => {
      state.cancellingOrder = false;
      state.cancelError = null;
      state.cancelSuccess = false;
      state.cancelledOrderId = null;
    },
    clearOrderErrors: state => {
      state.orderError = null;
      state.cancelError = null;
    },
    clearCancelSuccess: state => {
      state.cancelSuccess = false;
      state.cancelledOrderId = null;
    },
  },
  extraReducers: builder => {
    builder
      // Place Order cases
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
      })
      
      // Cancel Order cases
      .addCase(cancelOrder.pending, state => {
        state.cancellingOrder = true;
        state.cancelError = null;
        state.cancelSuccess = false;
        state.cancelledOrderId = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancellingOrder = false;
        state.cancelError = null;
        state.cancelSuccess = true;
        state.cancelledOrderId = action.payload.orderId;
        console.log('🟢 ORDER CANCELLED SUCCESSFULLY:', action.payload);
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancellingOrder = false;
        state.cancelError = action.payload;
        state.cancelSuccess = false;
        state.cancelledOrderId = null;
        console.log('🔴 ORDER CANCELLATION FAILED:', action.payload);
      });
  },
});

export const { 
  resetOrderState, 
  resetCancelState, 
  clearOrderErrors, 
  clearCancelSuccess 
} = orderSlice.actions;
export default orderSlice.reducer;