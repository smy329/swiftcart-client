import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchCartItemsByUserId, updateCart } from './cartAPI';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  error: '',
};

export const addToCartAsync = createAsyncThunk('cart/addToCart', async (item) => {
  const response = await addToCart(item);
  return response;
});

export const fetchCartItemsByUserIdAsync = createAsyncThunk('cart/fetchCartItemsByUserId', async (userId) => {
  const response = await fetchCartItemsByUserId(userId);

  return response;
});

export const updateCartAsync = createAsyncThunk('cart/updateCart', async (update) => {
  const response = await updateCart(update);
  return response;
});

export const deleteItemFromCartAsync = createAsyncThunk('cart/deleteItemFromCart', async (itemId) => {
  const response = await deleteItemFromCart(itemId);
  return response;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.isError = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.isError = false;
      })
      .addCase(fetchCartItemsByUserIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
        state.isError = false;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(index, 1);
        state.isError = false;
      })
      .addCase(deleteItemFromCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default cartSlice.reducer;
