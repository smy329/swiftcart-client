import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateUser } from './authAPI';

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

export const checkUserAsync = createAsyncThunk('auth/checkUser', async (loginInfo) => {
  const response = await checkUser(loginInfo);
  return response;
});

export const updateUserAsync = createAsyncThunk('auth/updateUser', async (update) => {
  const response = await updateUser(update);
  console.log(response);
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
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.loggedInUser = action.payload;

        state.error = action.payload?.error || '';
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = null;
        state.isError = true;
        state.error = action.error?.message || 'An error occurred while fetching user data';
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.loggedInUser = action.payload;

        state.error = action.payload?.error || '';
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = null;
        state.isError = true;
        state.error = action.error?.message || 'An error occurred while fetching user data';
      });
  },
});

export default authSlice.reducer;
