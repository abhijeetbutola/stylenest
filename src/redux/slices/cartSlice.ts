import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "../../components/product-grid/schema";

// Type definitions
export type CartItem = {
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
  [key: string]: unknown; // Allow additional properties
};

export type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  appliedCoupon: string | null;
  discount: number;
  afterDiscount: number;
};

export const COUPONS: Record<string, number> = {
  WELCOME10: 10, // 10% off
  SUMMER20: 20, // 20% off
  FLAT50: 50, // 50% off
  GR8TFRNTND15: 15, // 15% off
};

// Initial state
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  appliedCoupon: null,
  discount: 0,
  afterDiscount: 0,
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
        state.items.push({ ...newItem, totalPrice });
      }

      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.sale_price * newItem.quantity;
      state.afterDiscount =
        state.totalAmount - (state.totalAmount * state.discount) / 100;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.appliedCoupon = null;
      state.discount = 0;
      state.afterDiscount = 0;
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
        const priceDifference =
          existingItem.sale_price * (quantity - existingItem.quantity);
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.sale_price;
        state.totalAmount += priceDifference;
      }

      state.afterDiscount =
        state.totalAmount - (state.totalAmount * state.discount) / 100;
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

      if (state.items.length === 0) {
        state.appliedCoupon = null;
        state.discount = 0;
        state.afterDiscount = 0;
      } else {
        state.afterDiscount =
          state.totalAmount - (state.totalAmount * state.discount) / 100;
      }
    },

    applyCoupon: (state, action: PayloadAction<string>) => {
      const couponCode = action.payload.toUpperCase();
      if (COUPONS[couponCode]) {
        state.appliedCoupon = couponCode;
        state.discount = COUPONS[couponCode];
        state.afterDiscount =
          state.totalAmount - (state.totalAmount * state.discount) / 100;
      }
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discount = 0;
      state.afterDiscount = state.totalAmount;
    },
  },
});

export const {
  addItem,
  updateItems,
  clearCart,
  removeItems,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
