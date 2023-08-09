import React, { useEffect } from 'react';
import CategoryFilters from './CategoryFilters';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItemsByUserId } from '../../features/cart/cartAPI';

const Home = () => {
  
  return (
    <div>
      <CategoryFilters />
    </div>
  );
};

export default Home;
