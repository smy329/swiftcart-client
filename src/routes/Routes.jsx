import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../pages/layouts/MainLayout';
import Home from '../pages/Home/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
