import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../pages/layouts/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Cart from '../pages/Checkout/Cart';
import Checkout from '../pages/Checkout/Checkout';
import ProductDetails from '../pages/ProductDetails/ProductDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
]);
