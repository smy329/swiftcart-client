import axiosInstance from '../../utils/axios';

export const createUser = async (userData) => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};
