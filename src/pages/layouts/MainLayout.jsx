import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItemsByUserIdAsync } from '../../features/cart/cartSlice';

const MainLayout = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchCartItemsByUserIdAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
