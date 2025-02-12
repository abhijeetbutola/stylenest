import { configureStore } from "@reduxjs/toolkit";
import cartItemsReducer, { CartState } from "./slices/cartSlice"; // Import CartState type
import productsReducer from "./slices/productsSlice";
import collectionsReducer from "./slices/collectionsSlice";
import gendersReducer from "./slices/gendersSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import authReducer from "./slices/authSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utils/localStorageUtils";

// Define the type of the preloaded state
const preloadedCartState: CartState = loadStateFromLocalStorage() || {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
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
    productDetails: productDetailsReducer,
    auths: authReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState().cartItems);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
