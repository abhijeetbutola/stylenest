import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "../../components/product-grid/schema";

// Type definitions
type CartItem = {
  product_id: string;
  color: string;
  size: string;
  quantity: number;
  list_price: number;
  sale_price: number;
  totalPrice: number;
  stock: number;
  images: Image[];
  name: string;
  description: string;
  [key: string]: unknown; // For any additional properties in the new item payload
};

export type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
};

// Initial state
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product_id === newItem.product_id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.sale_price * newItem.quantity;
      } else {
        const totalPrice = newItem.sale_price * newItem.quantity;
        state.items.push({
          ...newItem,
          totalPrice,
        });
      }

      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.sale_price * newItem.quantity;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    updateItems: (
      state,
      action: PayloadAction<{
        product_id: string;
        color: string;
        size: string;
        quantity: number;
      }>
    ) => {
      const { product_id, color, size, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product_id === product_id &&
          item.color === color &&
          item.size === size
      );

      if (existingItem) {
        const prevTotalPrice = existingItem.totalPrice;
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.sale_price;
        state.totalAmount -= prevTotalPrice - existingItem.totalPrice;
      }
    },
    removeItems: (
      state,
      action: PayloadAction<{ product_id: string; color: string; size: string }>
    ) => {
      const { product_id, color, size } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product_id === product_id &&
          item.color === color &&
          item.size === size
      );

      if (existingItem) {
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(
          (item) =>
            item.product_id !== product_id ||
            item.color !== color ||
            item.size !== size
        );
      }
    },
  },
});

export const { addItem, updateItems, clearCart, removeItems } =
  cartSlice.actions;
export default cartSlice.reducer;
