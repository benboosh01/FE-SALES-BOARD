import { useState, useEffect } from 'react';
import { getSales } from '../utils/api';
import DatePicker from 'react-datepicker';
import { Loading } from './Loading';

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
              <p className="sales-entry-element">
                {salesEntry.sales_date.toString().slice(6, 8)}/
                {salesEntry.sales_date.toString().slice(4, 6)}/
                {salesEntry.sales_date.toString().slice(0, 4)}
              </p>
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
