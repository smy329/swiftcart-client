import axiosInstance from '../../utils/axios';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const fetchProductsByFilters = async (filter) => {
  let queryString = '';

  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  const response = await axiosInstance.get('/products?' + queryString);
  return response.data;
};
