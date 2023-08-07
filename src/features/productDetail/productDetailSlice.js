import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductDetail } from './productDetailAPI';

const initialState = {
  productDetail: {},
  isLoading: false,
  isError: false,
  error: '',
};

export const getProductDetail = createAsyncThunk('productDetail/getProductDetail', async (id) => {
  const productDetail = await fetchProductDetail(id);

  return productDetail;
});

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetail = {};
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default productDetailSlice.reducer;
