import axios from 'axios';

const salesBoardApi = axios.create({
  baseURL: 'https://sales-board.cyclic.app/api/',
});

export const getSales = (date, salesType) => {
  return salesBoardApi
    .get('sales', { params: { sales_date: date, sales_type: salesType } })
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
