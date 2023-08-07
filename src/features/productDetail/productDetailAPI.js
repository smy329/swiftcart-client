import axiosInstance from '../../utils/axios';

export const fetchProductDetail = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};
