import { useState, useEffect, useContext } from 'react';
import { getSales } from '../utils/api';
import { UserContext } from '../contexts/user';

import 'react-datepicker/dist/react-datepicker.css';

export const UserSales = ({ salesType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getSales(null, salesType, loggedInUser.username).then(({ sales }) => {
      setSales(sales);
      setIsLoading(false);
    });
  }, [salesType, loggedInUser.username]);

  if (isLoading) return <p>loading....</p>;
  return (
    <section>
      <ul>
        {sales.map((salesEntry) => {
          return (
            <li key={salesEntry.sales_entry_id}>
              <p>{salesEntry.sales_date}</p>
              <p>{salesEntry.first_name}</p>
              <p>{salesEntry.surname}</p>
              <p>{salesEntry.sales_type}</p>
              <p>{salesEntry.sales_number}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
