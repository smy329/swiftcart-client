import axiosInstance from '../../utils/axios';

export const createUser = async (userData) => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};

export const checkUser = async (loginInfo) => {
  const email = loginInfo.email;
  const password = loginInfo.password;

  try {
    const response = await axiosInstance.get('/users?email=' + email);
    const data = response.data;

    if (data.length) {
      if (password === data[0].password) {
        return data[0];
      } else {
        return { error: 'Incorrect Password' };
      }
    } else {
      return { error: 'User not found' };
    }
  } catch (error) {
    return { error: 'An error occurred while fetching user data' };
  }
};

export const updateUser = async (update) => {
  const response = await axiosInstance.patch(`/users/${update.id}`, update);
  console.log(response.data);
  return response.data;
};
