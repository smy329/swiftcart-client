import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchCategories } from './filtersAPI';

const initialState = {
  categories: [],
  brands: [],
  isLoading: false,
  isError: false,
  error: '',
};

export const getCategories = createAsyncThunk('filters/categories', async () => {
  const categories = await fetchCategories();
  return categories;
});

export const getBrands = createAsyncThunk('filters/brands', async () => {
  const brands = await fetchBrands();
  return brands;
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categories = [];
        state.isError = true;
        state.isError = action.error?.message;
      })
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.brands = [];
        state.isError = true;
        state.isError = action.error?.message;
      });
  },
});

export default filtersSlice.reducer;
