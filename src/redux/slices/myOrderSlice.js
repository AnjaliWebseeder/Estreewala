// myorderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosConfig';
import { BASE_URL } from '../../services/api';

// Async thunks for different order statuses
export const getOrdersByStatus = createAsyncThunk(
  'orders/getOrdersByStatus',
  async (status, { rejectWithValue }) => {
    try {
      console.log(`📦 Fetching ${status} orders...`);

      const response = await axiosInstance.get(
        `${BASE_URL}/customers/orders-status?status=${status}`,
        {
          timeout: 10000,
        }
      );

      console.log(`✅ ${status.toUpperCase()} Orders Response:`, response.data);
      return {
        status,
        data: response.data.data || [],
        pagination: response.data.pagination
      };
    } catch (error) {
      console.log(`❌ Get ${status} Orders Error:`, error);

      let errorMessage = `Failed to fetch ${status} orders`;

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

const myorderSlice = createSlice({
  name: 'myOrder',
  initialState: {
    // Orders by status
    pendingOrders: [],
    acceptedOrders: [],
    rejectedOrders: [],
    completedOrders: [],
    
    // Loading states
    pendingLoading: false,
    acceptedLoading: false,
    rejectedLoading: false,
    completedLoading: false,
    
    // Error states
    pendingError: null,
    acceptedError: null,
    rejectedError: null,
    completedError: null,
    
    // General states
    ordersLoading: false,
    ordersError: null,
  },
  reducers: {
    resetOrdersState: state => {
      state.ordersLoading = false;
      state.ordersError = null;
    },
    clearOrdersErrors: state => {
      state.ordersError = null;
      state.pendingError = null;
      state.acceptedError = null;
      state.rejectedError = null;
      state.completedError = null;
    },
    // ADD THESE NEW REDUCERS:
    addNewOrder: (state, action) => {
      const newOrder = action.payload;
      console.log('🆕 Adding new order to Redux:', newOrder);
      
      // Add to the appropriate array based on status
      if (newOrder.status === 'pending') {
        // Check if order already exists to avoid duplicates
        const existingOrder = state.pendingOrders.find(order => order.id === newOrder.id);
        if (!existingOrder) {
          state.pendingOrders.unshift(newOrder); // Add to beginning
        }
      } else if (newOrder.status === 'accepted') {
        const existingOrder = state.acceptedOrders.find(order => order.id === newOrder.id);
        if (!existingOrder) {
          state.acceptedOrders.unshift(newOrder);
        }
      } else if (newOrder.status === 'completed') {
        const existingOrder = state.completedOrders.find(order => order.id === newOrder.id);
        if (!existingOrder) {
          state.completedOrders.unshift(newOrder);
        }
      }
    },
    refreshOrders: (state) => {
      // Clear all orders to force refresh
      state.pendingOrders = [];
      state.acceptedOrders = [];
      state.completedOrders = [];
      console.log('🔄 Orders cleared for refresh');
    },
    updateOrderStatus: (state, action) => {
  const { orderId, status, reason, updatedAt } = action.payload; // ← Change to "status"
  console.log(`🔄 Updating order ${orderId} to status: ${status}`);
  
  // Remove from current status array and add to new status array
  const allOrders = [
    ...state.pendingOrders,
    ...state.acceptedOrders, 
    ...state.completedOrders
  ];
  
  const orderToUpdate = allOrders.find(order => order.id === orderId);
  
  if (orderToUpdate) {
    // Remove from all arrays
    state.pendingOrders = state.pendingOrders.filter(order => order.id !== orderId);
    state.acceptedOrders = state.acceptedOrders.filter(order => order.id !== orderId);
    state.completedOrders = state.completedOrders.filter(order => order.id !== orderId);
    
    // Add to appropriate array with updated status
    const updatedOrder = { 
      ...orderToUpdate, 
      status: status,
      ...(reason && { reason }), // Add reason if provided
      ...(updatedAt && { updatedAt }) // Add updatedAt if provided
    };
    
    if (status === 'pending') {
      state.pendingOrders.unshift(updatedOrder);
    } else if (status === 'accepted') {
      state.acceptedOrders.unshift(updatedOrder);
    } else if (status === 'completed') {
      state.completedOrders.unshift(updatedOrder);
    } else if (status === 'rejected') {
      // Handle rejected orders if needed
      state.rejectedOrders.unshift(updatedOrder);
    }
    
    console.log(`✅ Order ${orderId} moved to ${status} tab`);
  } else {
    console.log(`⚠️ Order ${orderId} not found in current orders`);
  }
},
  },
  extraReducers: builder => {
  builder
    // 🔄 Pending
    .addCase(getOrdersByStatus.pending, (state, action) => {
      const status = action.meta.arg;

      if (status.includes(',')) {
        // Past Orders loading
        state.completedLoading = true;
        state.completedError = null;
      } else {
        state[`${status}Loading`] = true;
        state[`${status}Error`] = null;
      }
    })

    // ✅ Fulfilled
    .addCase(getOrdersByStatus.fulfilled, (state, action) => {
      const { status, data } = action.payload;

      if (status.includes(',')) {
        // 🔥 completed + rejected + cancelled → Past Orders
        state.completedLoading = false;
        state.completedOrders = data;
      } else {
        state[`${status}Loading`] = false;
        state[`${status}Orders`] = data;
      }
    })

    // ❌ Rejected
    .addCase(getOrdersByStatus.rejected, (state, action) => {
      const status = action.meta.arg;

      if (status.includes(',')) {
        state.completedLoading = false;
        state.completedError = action.payload;
      } else {
        state[`${status}Loading`] = false;
        state[`${status}Error`] = action.payload;
      }
    });
}

});

export const { 
  resetOrdersState, 
  clearOrdersErrors, 
  addNewOrder, 
  refreshOrders, 
  updateOrderStatus 
} = myorderSlice.actions;
export default myorderSlice.reducer;