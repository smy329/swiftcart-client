import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsAPI';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: '',
};

export const getProducts = createAsyncThunk('products/getVideos', async () => {
  const products = await fetchProducts();
  console.log(products);
  return products;
});

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
        console.log(action.payload);
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default productSlice.reducer;
