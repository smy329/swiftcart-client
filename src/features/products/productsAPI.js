import axiosInstance from '../../utils/axios';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const fetchProductsByFilters = async (filter, sort, pagination) => {
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
  // if we explain, here pagination is an object. we have two key _page, _limit.
  // then how to get value of the key? pagination[key]. pagination[_page] will give us the value 1
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
    console.log(
      'pagination',
      pagination,
      'queryString: ',
      queryString,
      'key:',
      key,
      'pagination[key]:',
      pagination[key]
    );
  }

  const response = await axiosInstance.get('/products?' + queryString);
  const data = response.data;
  const totalItems = await response.headers.get('x-total-count');
  return { data: { products: data, totalItems: +totalItems } };
};
