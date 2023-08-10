import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  error: '',
};

export const createOrderAsync = createAsyncThunk('order/createOrder', async (order) => {
  const response = await createOrder(order);

  return response;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = null;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default orderSlice.reducer;
