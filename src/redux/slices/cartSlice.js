// redux/slices/cartSlice.js - UPDATED
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  items: {}, // { [cleanItemId_service]: { itemId, service, price, qty, name, image, category, itemName } }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  // In cartSlice.js - Update addToCart reducer
addToCart: (state, action) => {
  const { id, service, price, name, image, category } = action.payload;
  
  // Clean item name (for backend)
  const cleanItemName = id.split('_')[0];
  const cleanName = name ? name.split('_')[0] : cleanItemName;
  
  // ✅ UNIQUE KEY includes category to distinguish same item in different categories
  const uniqueKey = `${cleanItemName}_${category}_${service}`;
  
  console.log("🛒 addToCart - Creating unique key with category:", {
    originalId: id,
    cleanItemName: cleanItemName,
    category: category,
    service: service,
    uniqueKey: uniqueKey
  });
  
  if (state.items[uniqueKey]) {
    state.items[uniqueKey].qty += 1;
  } else {
    state.items[uniqueKey] = { 
      itemId: cleanItemName,          // ✅ Clean item name for backend
      originalItemId: id,             // Original ID (might include category if needed)
      service: service,
      price: price,
      qty: 1,
      name: cleanName,                // Clean item name
      itemName: cleanName,            // Clean item name for backend
      image: image || null,
      category: category || 'general' // Store category separately
    };
  }
},

// Update incrementQty and decrementQty
incrementQty: (state, action) => {
  const uniqueKey = action.payload; // Now expects "T Shirt_man_Washing"
  console.log("🔼 Redux Increment - Key:", uniqueKey);
  
  if (state.items[uniqueKey]) {
    state.items[uniqueKey].qty += 1;
  } else {
    console.log("❌ Item not found with key:", uniqueKey);
  }
},

decrementQty: (state, action) => {
  const uniqueKey = action.payload; // Now expects "T Shirt_man_Washing"
  console.log("🔽 Redux Decrement - Key:", uniqueKey);
  
  if (state.items[uniqueKey]) {
    if (state.items[uniqueKey].qty > 1) {
      state.items[uniqueKey].qty -= 1;
    } else {
      delete state.items[uniqueKey];
    }
  } else {
    console.log("❌ Item not found with key:", uniqueKey);
  }
},


// ✅ UPDATED: changeService - use original ID for key
changeService: (state, action) => {
  const { itemId, oldService, newService, newPrice } = action.payload;
  
  // Use original itemId for keys
  const oldKey = `${itemId}_${oldService}`;
  const newKey = `${itemId}_${newService}`;
  
  if (state.items[oldKey]) {
    const { qty, name, image, category, itemId: cleanItemId } = state.items[oldKey];
    
    // Remove old entry
    delete state.items[oldKey];
    
    // Add new entry with new service
    state.items[newKey] = {
      itemId: cleanItemId,      // Clean item ID for backend
      originalItemId: itemId,   // Original item ID for UI
      service: newService,
      price: newPrice,
      qty: qty,
      name: name,
      itemName: name,
      image: image,
      category: category
    };
  }
},

// ✅ UPDATED: addServiceToItem - use original ID for key
addServiceToItem: (state, action) => {
  const { itemId, service, price, name, image, category } = action.payload;
  
  const cleanItemName = itemId.split('_')[0];
  const cleanName = name ? name.split('_')[0] : cleanItemName;
  const uniqueKey = `${itemId}_${service}`; // Use original itemId
  
  if (!state.items[uniqueKey]) {
    state.items[uniqueKey] = {
      itemId: cleanItemName,    // Clean for backend
      originalItemId: itemId,   // Original for UI
      service: service,
      price: price,
      qty: 1,
      name: cleanName,
      itemName: cleanName,
      image: image || null,
      category: category || 'general'
    };
  } else {
    // If service already exists, increment quantity
    state.items[uniqueKey].qty += 1;
  }
},
    // ✅ UPDATED: removeServiceFromItem - clean item name
    removeServiceFromItem: (state, action) => {
      const { itemId, service } = action.payload;
      const cleanItemName = itemId.split('_')[0];
      const uniqueKey = `${cleanItemName}_${service}`;
      delete state.items[uniqueKey];
    },
    
    // ✅ UPDATED: updateServiceQuantity - clean item name
    updateServiceQuantity: (state, action) => {
      const { itemId, service, qty } = action.payload;
      const cleanItemName = itemId.split('_')[0];
      const uniqueKey = `${cleanItemName}_${service}`;
      
      if (state.items[uniqueKey]) {
        if (qty <= 0) {
          delete state.items[uniqueKey];
        } else {
          state.items[uniqueKey].qty = qty;
        }
      }
    },
    
  // ✅ UPDATED: changeCategory - update by original ID
changeCategory: (state, action) => {
  const { itemId, category } = action.payload;
  const cleanItemName = itemId.split('_')[0];
  
  // Update category for all services of this item
  Object.keys(state.items).forEach(key => {
    if (state.items[key].originalItemId === itemId || 
        state.items[key].itemId === cleanItemName) {
      state.items[key].category = category;
    }
  });
},
    
   // ✅ UPDATED: updateItemPrice - update by original ID
updateItemPrice: (state, action) => {
  const { itemId, price } = action.payload;
  const cleanItemName = itemId.split('_')[0];
  
  Object.keys(state.items).forEach(key => {
    // Check both originalItemId and itemId to cover all cases
    if ((state.items[key].originalItemId === itemId || 
         state.items[key].itemId === cleanItemName) && 
        price !== undefined && price !== null) {
      state.items[key].price = price;
    }
  });
},
    // ✅ UPDATED: removeFromCart - uses the exact uniqueKey
    removeFromCart: (state, action) => {
      const uniqueKey = action.payload;
      delete state.items[uniqueKey];
    },
    
    // ✅ KEPT: clearCart
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
  addServiceToItem,
  removeServiceFromItem,
  updateServiceQuantity,
  changeCategory,
  updateItemPrice,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// ============ SELECTORS ============

// ✅ Get all cart items as array
export const selectCartItems = (state) => Object.values(state.cart.items);

// ✅ Get cart total price
export const selectCartTotal = (state) => {
  return Object.values(state.cart.items).reduce((total, item) => {
    return total + (item.price * item.qty);
  }, 0);
};

// ✅ Get total items count (sum of all quantities)
export const selectCartItemsCount = (state) => {
  return Object.values(state.cart.items).reduce((count, item) => {
    return count + item.qty;
  }, 0);
};

// ✅ Get items grouped by itemId (using clean item names)
export const selectGroupedCartItems = (state) => {
  const grouped = {};
  Object.values(state.cart.items).forEach(item => {
    if (!grouped[item.itemId]) {
      grouped[item.itemId] = [];
    }
    grouped[item.itemId].push(item);
  });
  return grouped;
};

// ✅ Get items for a specific item
export const selectItemServices = (state, itemId) => {
  return Object.values(state.cart.items)
    .filter(item => item.originalItemId === itemId) // Match by original ID
    .map(item => ({
      service: item.service,
      price: item.price,
      qty: item.qty
    }));
};


// ✅ Get items by category
export const selectItemsByCategory = (state, category) => {
  return Object.values(state.cart.items).filter(item => item.category === category);
};

// ✅ Get items by service
export const selectItemsByService = (state, service) => {
  return Object.values(state.cart.items).filter(item => item.service === service);
};

// ✅ Get total by service
export const selectTotalByService = (state, service) => {
  return Object.values(state.cart.items)
    .filter(item => item.service === service)
    .reduce((total, item) => total + (item.price * item.qty), 0);
};

// ✅ UPDATED: Get formatted order payload - returns clean item names
export const selectOrderPayloadItems = (state) => {
  return Object.values(state.cart.items).map(item => ({
    item: item.name || item.itemName,     // ✅ Clean item name (e.g., "Formal Shirt")
    category: item.category || 'general',  // Category
    service: item.service,                // Service name
    quantity: item.qty,                   // Quantity
    price: item.price                     // Price per item
  }));
};

// ✅ UPDATED: Get complete order payload
export const selectOrderPayload = (state, vendorId, otherOrderDetails = {}) => {
  const items = selectOrderPayloadItems(state);
  const totalPrice = selectCartTotal(state);
  
  // Debug log to verify item names
  console.log("📦 Order payload items:", items.map(item => ({
    item: item.item,
    service: item.service
  })));
  
  return {
    vendorId: vendorId || '',
    items: items,
    totalPrice: totalPrice,
    ...otherOrderDetails
  };
};

// ✅ UPDATED: Get unique items count (using clean item names)
export const selectUniqueItemsCount = (state) => {
  const uniqueItemIds = new Set();
  Object.values(state.cart.items).forEach(item => {
    uniqueItemIds.add(item.itemId); // Using clean itemId
  });
  return uniqueItemIds.size;
};

// ✅ UPDATED: Check if an item has a specific service
export const selectServiceQuantity = (state, itemId, service) => {
  const uniqueKey = `${itemId}_${service}`;
  return state.cart.items[uniqueKey]?.qty || 0;
};

// ✅ UPDATED: Get all services for an item with quantities
export const selectItemServicesWithQuantity = (state, itemId) => {
  return Object.values(state.cart.items)
    .filter(item => item.originalItemId === itemId) // Match by original ID
    .map(item => ({
      service: item.service,
      quantity: item.qty,
      price: item.price,
      total: item.price * item.qty
    }));
};

// ✅ NEW: Helper to clean item names for display
export const cleanItemName = (itemName) => {
  return itemName ? itemName.split('_')[0] : itemName;
};

export default cartSlice.reducer;