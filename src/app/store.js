import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import ProductDetailReducer from '../features/productDetail/productDetailSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    productDetail: ProductDetailReducer,
    auth: authReducer,
  },
});
