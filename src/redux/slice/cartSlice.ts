import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductTypeWithCount, ProductCart } from "../../models/types";

const saveCartItems = (items: ProductTypeWithCount[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const loadCartItems = (): ProductTypeWithCount[] => {
  const itemsJSON = localStorage.getItem("cartItems");
  return itemsJSON ? JSON.parse(itemsJSON) : [];
};

const initialState: ProductCart = {
  items: loadCartItems(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ item: ProductTypeWithCount; count: number }>
    ) => {
      const { item, count } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (product) => product.id === item.id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].count += count;
      } else {
        state.items.push({ ...item, count });
      }
      saveCartItems(state.items);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      saveCartItems(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartItems(state.items);
    },
    updateItemCount: (
      state,
      action: PayloadAction<{ productId: number; newCount: number }>
    ) => {
      const { productId, newCount } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        state.items[itemIndex].count = newCount;
      }
      saveCartItems(state.items);
    },
  },
});

export const { addItem, removeItem, clearCart, updateItemCount } =
  cartSlice.actions;
export default cartSlice.reducer;
