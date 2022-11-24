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
    <section className="user-sales-section">
      <h3>User Sales:</h3>
      <ul className="user-sales-ul">
        {sales.map((salesEntry) => {
          return (
            <li key={salesEntry.sales_entry_id} className="sales-entry">
              <p>
                {salesEntry.sales_date.toString().slice(6, 8)}/
                {salesEntry.sales_date.toString().slice(4, 6)}/
                {salesEntry.sales_date.toString().slice(0, 4)}
              </p>
              <p>
                {salesEntry.sales_type}: {salesEntry.sales_number}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
