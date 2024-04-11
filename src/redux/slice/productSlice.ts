import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, URL } from "../../models/constant";

interface ProductProps {
  id: number;
  categoryId: number;
  article: string;
  name: string;
  unit: string;
  availability: boolean;
  brand: string;
  manufacturerArticle: string;
  weight: number;
  priceLess100000: number;
  priceMore100000: number;
  priceMore500000: number;
  updatedAt: string;
  imageUrl: string;
}

interface ProductState {
  products: ProductProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (searchName: string) => {
    const response = await axios.get(
      URL.BASE_URL + Product.GET_WITH_PAGING + `?SearchName=${searchName}`
    );
    return response.data.items;
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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default productsSlice.reducer;
