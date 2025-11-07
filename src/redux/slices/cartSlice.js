const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  items: {}, // { [productId]: { qty, service } }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, service, price } = action.payload;
      state.items[id] = { qty: 1, service, price };
    },
    incrementQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].qty += 1;
      }
    },
    decrementQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        if (state.items[id].qty > 1) {
          state.items[id].qty -= 1;
        } else {
          delete state.items[id];
        }
      }
    },
    changeService: (state, action) => {
      const { id, service } = action.payload;
      if (state.items[id]) {
        state.items[id].service = service;
      }
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    clearCart: state => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  changeService,
  clearCart,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
