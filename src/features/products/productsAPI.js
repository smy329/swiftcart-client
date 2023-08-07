import axiosInstance from '../../utils/axios';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const fetchProductsByFilters = async (filter, sort) => {
  // filter = {"category": ["smartphone", "laptop"]}
  // sort = {_sort: "price", _order: "desc"}

  // TODO: on server it will support multiple values
  let queryString = '';

  for (let key in filter) {
    const categoryValues = filter[key];
    console.log(categoryValues);
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  //pagination ={_page:1, _limit=10}
  // for (let key in pagination) {
  //   queryString += `${key}=${filter[key]}&`;
  // }

  const response = await axiosInstance.get('/products?' + queryString);
  return response.data;
};
