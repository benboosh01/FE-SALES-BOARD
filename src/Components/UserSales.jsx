import { useState, useEffect, useContext } from 'react';
import { getSales } from '../utils/api';
import { UserContext } from '../contexts/user';
import { Loading } from './Loading';

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

  if (isLoading) return <Loading />;
  return (
    <section className="user-sales-section">
      <h3>User Sales:</h3>
      <ul className="sales-ul user-sales-ul">
        {sales.map((salesEntry) => {
          return (
            <li key={salesEntry.sales_entry_id} className="sales-entry">
              <p className="sales-entry-element sales-entry-date">
                {salesEntry.sales_date.toString()}
              </p>
              <p className="sales-entry-element sales-entry-number">
                {salesEntry.sales_type}: {salesEntry.sales_number}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
