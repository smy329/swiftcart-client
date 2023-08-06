import axiosInstance from '../../utils/axios';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  console.log(response.data);
  return response.data;
};
