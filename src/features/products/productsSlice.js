import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsByFilters } from './productsAPI';

const initialState = {
  products: [],
  totalItems: 0,
  isLoading: false,
  isError: false,
  error: '',
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const products = await fetchProducts();

  return products;
});

export const getProductsByFilter = createAsyncThunk(
  'products/getProductsByFilter',
  async ({ filter, sort, pagination }) => {
    const productsByFilter = await fetchProductsByFilters(filter, sort, pagination);

    return productsByFilter;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(getProductsByFilter.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getProductsByFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data.products;
        state.totalItems = action.payload.data.totalItems;
      })
      .addCase(getProductsByFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default productSlice.reducer;
