// productDetailsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()
const API_URL = process.env.REACT_APP_BASE_API_URL

// Define the shape of the state
interface ProductDetailsState {
  data: ProductDetails | null; // Define the structure of `ProductDetails` or replace with `any` if uncertain.
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Example interface for product details (replace with the actual structure)
type ProductDetails = {
    product_id: string;
    name: string;
    description: string;
    category: {
      category_id: string;
      name: string;
      created_at: string;
    };
    collection: {
      collection_id: string;
      name: string;
      description: string;
      image_url: string;
      created_at: string;
    };
    created_at: string;
    colors: string[];
    images: {
      color: string;
      image_url: string;
    }[];
    info: {
      title: string;
      description: string[];
    }[];
    inventory: {
      sku: string;
      color: string;
      size: string;
      list_price: number;
      discount: number | null;
      discount_percentage: number | null;
      sale_price: number;
      sold: number;
      stock: number;
    }[];
    priceRange: {
      highest: number;
      lowest: number;
    };
    rating: number;
    reviews: number;
    sizes: string[];
    sold: number;
  }
  

// Define the initial state
const initialState: ProductDetailsState = {
  data: null,
  status: 'idle',
  error: null,
};

// Async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk<
  ProductDetails, // Success payload type
  string, // Argument type (productId)
  { rejectValue: string } // Rejected payload type
>(
  'productDetails/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProductDetails>(
        `${API_URL}/projects/challenges/e-commerce/products/${productId}`
      );
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Create the slice
const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<ProductDetails>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        }
      )
      .addCase(
        fetchProductDetails.rejected,
        (state, action: PayloadAction<string | undefined, string>) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to fetch product details';
        }
      );
  },
});

export default productDetailsSlice.reducer;
