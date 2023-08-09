import axiosInstance from '../../utils/axios';

export const addToCart = async (item) => {
  const response = await axiosInstance.post('/cart', item);
  return response.data;
};

export const fetchCartItemsByUserId = async (userId) => {
  const response = await axiosInstance.get('/cart?loggedInUser.id=' + userId);
  return response.data;
};

export const updateCart = async (update) => {
  const response = await axiosInstance.patch(`/cart/${update.id}`, update);
  return response.data;
};

export const deleteItemFromCart = async (itemId) => {
  const response = await axiosInstance.delete(`/cart/${itemId}`, itemId);
  return response.data;
};
