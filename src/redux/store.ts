import { configureStore } from "@reduxjs/toolkit";
import cartItemsReducer, { CartState } from "./slices/cartSlice"; // Import CartState type
import productsReducer from "./slices/productsSlice";
import collectionsReducer from "./slices/collectionsSlice";
import gendersReducer from "./slices/gendersSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import colorsReducer from "./slices/colorsSlice";
import ratingsReducer from "./slices/ratingsSlice";
import authReducer from "./slices/authSlice";
import contextualSidebarReducer from "./slices/contextualSidebarSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utils/localStorageUtils";

// Define the type of the preloaded state
const preloadedCartState: CartState = loadStateFromLocalStorage() || {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  appliedCoupon: null,
  discount: 0,
  afterDiscount: 0,
};

const preloadedState = {
  cartItems: preloadedCartState,
};

export const store = configureStore({
  reducer: {
    cartItems: cartItemsReducer,
    products: productsReducer,
    collections: collectionsReducer,
    genders: gendersReducer,
    colors: colorsReducer,
    ratings: ratingsReducer,
    productDetails: productDetailsReducer,
    auths: authReducer,
    contextualSidebar: contextualSidebarReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState().cartItems);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
