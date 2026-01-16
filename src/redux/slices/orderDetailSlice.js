import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../services/axiosConfig';
import { ORDER_DETAILS } from "../../services/api";

// Async thunk to fetch order details by ID
export const fetchOrderDetail = createAsyncThunk(
  "orderDetail/fetchOrderDetail",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(ORDER_DETAILS(orderId));
      if (response.data.success) {
        console.log("order detials",response.data.order);
        return response.data.order;
      } else {
        return rejectWithValue("Failed to fetch order details");
      }
    } catch (error) {
      console.error("Order detail fetch error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderDetail: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order details";
      });
  },
});

export const { clearOrderDetail } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
