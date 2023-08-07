import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  isError: false,
  isLoading: false,
  error: '',
};

export const newUser = createAsyncThunk('auth/newUser', async (userData) => {
  const response = await createUser(userData);

  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(newUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(newUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(newUser.rejected, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = null;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default authSlice.reducer;
