import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";

const BASE_URL = "https://www.greatfrontend.com/api";

type Product = {
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
  inventory: {
    sku: string;
    color: string;
    size: string | null;
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
};

type PaginationData = {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
};

type FetchProductsData = {
  data: Product[];
  pagination: PaginationData;
};

type ProductsState = {
  data: FetchProductsData | null; // Allow null initially
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type FetchProductsParams = {
  collection?: string;
  category?: string;
  page: number;
  per_page: number;
  sort?: string;
  direction?: "asc" | "desc";
};

type RootState = {
  genders: {
    selectedGenders: string[];
  };
  collections: {
    selectedCollections: string[];
  };
};

type FetchProductsRejectValue = {
  errorMessage: string;
};

const initialState: ProductsState = {
  data: null, // Set to null initially
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<
  FetchProductsData, // Fulfilled payload type
  FetchProductsParams, // Thunk argument type
  { rejectValue: FetchProductsRejectValue } // Rejected payload type
>(
  "products/fetchProducts",
  async (
    {
      collection,
      category,
      page,
      per_page,
      sort,
      direction,
    }: FetchProductsParams,
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;

      const selectedGenders = state.genders.selectedGenders.length
        ? state.genders.selectedGenders
        : category
        ? [category]
        : ["unisex", "women", "men"];

      const selectedCollections = state.collections.selectedCollections.length
        ? state.collections.selectedCollections
        : collection
        ? [collection]
        : ["latest", "cozy", "urban", "fresh"];

      const response = await axios.get(
        `${BASE_URL}/projects/challenges/e-commerce/products`,
        {
          params: {
            collection: selectedCollections,
            category: selectedGenders || category,
            page,
            per_page,
            sort,
            direction,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        }
      );

      return response.data as FetchProductsData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue({
        errorMessage: error.response?.data || "An error occurred",
      });
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<FetchProductsData>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(
        fetchProducts.rejected,
        (
          state,
          action: PayloadAction<FetchProductsRejectValue | undefined>
        ) => {
          state.status = "failed";
          state.error =
            action.payload?.errorMessage || "Failed to fetch products";
        }
      );
  },
});

export default productsSlice.reducer;
