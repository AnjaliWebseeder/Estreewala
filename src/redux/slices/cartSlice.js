const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  items: {}, // { [productId]: { qty, service, price, name, image, category } }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, service, price, name, image, category } = action.payload;
      
      if (state.items[id]) {
        state.items[id].qty += 1;
      } else {
        state.items[id] = { 
          id,
          qty: 1, 
          service, 
          price, 
          name: name || id, // Fallback to id if name not provided
          image: image || null, // Store image URL
          category: category || 'general' // Store category with fallback
        };
      }
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
    // ✅ UPDATED: changeService now accepts and updates price
  // In your cartSlice
changeService: (state, action) => {
  const { id, service, price } = action.payload;
  if (state.items[id]) {
    state.items[id].service = service;
    // Always update price when service changes
    if (price !== undefined) {
      state.items[id].price = price;
    }
  }
},
    changeCategory: (state, action) => {
      const { id, category } = action.payload;
      if (state.items[id]) {
        state.items[id].category = category;
      }
    },
    // ✅ NEW: Direct price update action
    updateItemPrice: (state, action) => {
      const { id, price } = action.payload;
      if (state.items[id] && price !== undefined && price !== null) {
        state.items[id].price = price;
      }
    },
    updateItemQuantity: (state, action) => {
      const { id, qty } = action.payload;
      if (state.items[id]) {
        if (qty <= 0) {
          delete state.items[id];
        } else {
          state.items[id].qty = qty;
        }
      }
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    clearCart: state => {
      state.items = {};
    },
    // Optional: Bulk operations
    updateMultipleItems: (state, action) => {
      const updates = action.payload;
      updates.forEach(({ id, updates }) => {
        if (state.items[id]) {
          state.items[id] = { ...state.items[id], ...updates };
        }
      });
    },
    // ✅ NEW: Bulk service and price update
    updateServicesAndPrices: (state, action) => {
      const updates = action.payload; // Array of { id, service, price }
      updates.forEach(({ id, service, price }) => {
        if (state.items[id]) {
          state.items[id].service = service;
          if (price !== undefined && price !== null) {
            state.items[id].price = price;
          }
        }
      });
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  changeService,
  changeCategory,
  updateItemPrice, // ✅ NEW export
  updateItemQuantity,
  removeFromCart,
  clearCart,
  updateMultipleItems,
  updateServicesAndPrices, // ✅ NEW export
} = cartSlice.actions;

// Selectors (you can add these for easier access)
export const selectCartItems = (state) => Object.values(state.cart.items);
export const selectCartTotal = (state) => {
  return Object.values(state.cart.items).reduce((total, item) => {
    return total + (item.price * item.qty);
  }, 0);
};
export const selectCartItemsCount = (state) => {
  return Object.values(state.cart.items).reduce((count, item) => {
    return count + item.qty;
  }, 0);
};
export const selectItemsByCategory = (state, category) => {
  return Object.values(state.cart.items).filter(item => item.category === category);
};

// ✅ NEW: Selector to get items by service
export const selectItemsByService = (state, service) => {
  return Object.values(state.cart.items).filter(item => item.service === service);
};

// ✅ NEW: Selector to get total by service
export const selectTotalByService = (state, service) => {
  return Object.values(state.cart.items)
    .filter(item => item.service === service)
    .reduce((total, item) => total + (item.price * item.qty), 0);
};

export default cartSlice.reducer;