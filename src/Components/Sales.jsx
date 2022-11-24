import { useState, useEffect } from 'react';
import { getSales } from '../utils/api';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const Sales = ({ salesType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setIsLoading(true);
    getSales(
      startDate.toLocaleDateString().slice(6, 10) +
        startDate.toLocaleDateString().slice(3, 5) +
        startDate.toLocaleDateString().slice(0, 2),
      salesType
    ).then(({ sales }) => {
      setSales(sales);
      setIsLoading(false);
    });
  }, [startDate, salesType]);

  if (isLoading) return <p>loading....</p>;
  return (
    <section className="all-sales-section">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
      />
      <ul>
        {sales.map((salesEntry) => {
          return (
            <li key={salesEntry.sales_entry_id} className="sales-entry">
              <p>{salesEntry.sales_date}</p>
              <p>
                {salesEntry.first_name} {salesEntry.surname}
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
