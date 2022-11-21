import axios from 'axios';

const salesBoardApi = axios.create({
  baseURL: 'https://sales-board.cyclic.app/api/',
});

export const getSales = (date, salesType, username) => {
  return salesBoardApi
    .get('sales', {
      params: { sales_date: date, sales_type: salesType, sales_user: username },
    })
    .then((res) => {
      return res.data;
    });
};

export const getSalesTypes = () => {
  return salesBoardApi.get('sales_types').then((res) => {
    return res.data;
  });
};

export const getUsers = () => {
  return salesBoardApi.get('users').then((res) => {
    return res.data;
  });
};

export const addUser = (newUser) => {
  return salesBoardApi.post('users', newUser).then((res) => {
    return res.data;
  });
};

export const updateUser = (userUpdate) => {
  console.log(userUpdate);
  return salesBoardApi.patch('users', userUpdate).then((res) => {
    return res.data;
  });
};
