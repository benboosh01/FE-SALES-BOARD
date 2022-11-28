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
  return salesBoardApi.patch('users', userUpdate).then((res) => {
    return res.data;
  });
};

export const addSales = (salesUpdate) => {
  return salesBoardApi.post('sales', salesUpdate).then((res) => {
    return res.data;
  });
};

export const updateSales = (salesUpdate) => {
  return salesBoardApi.patch('sales', salesUpdate).then((res) => {
    return res.data;
  });
};

export const getOrganisations = () => {
  return salesBoardApi.get('organisations').then((res) => {
    return res.data;
  });
};
