import { useState, useEffect } from 'react';
import { getSales } from '../utils/api';
import DatePicker from 'react-datepicker';
import { Loading } from './Loading';

import 'react-datepicker/dist/react-datepicker.css';

export const Sales = ({ salesType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2022-11-28'));

  useEffect(() => {
    setIsLoading(true);
    getSales(startDate.toLocaleDateString(), salesType).then(({ sales }) => {
      setSales(sales);
      setIsLoading(false);
    });
  }, [startDate, salesType]);

  if (isLoading) return <Loading />;
  return (
    <section className="all-sales-section">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
      />
      <ul className="sales-ul">
        {sales.map((salesEntry) => {
          return (
            <li key={salesEntry.sales_entry_id} className="sales-entry">
              <p className="sales-entry-element">{salesEntry.sales_date}</p>
              <p className="sales-entry-element sales-entry-name">
                {salesEntry.first_name} {salesEntry.surname}
              </p>
              <p className="sales-entry-element">
                {salesEntry.sales_type}: {salesEntry.sales_number}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
