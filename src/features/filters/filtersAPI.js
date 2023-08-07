import axiosInstance from '../../utils/axios';

export const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories');

  return response.data;
};

export const fetchBrands = async () => {
  const response = await axiosInstance.get('/brands');

  return response.data;
};
