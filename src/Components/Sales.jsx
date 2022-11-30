import { useState, useEffect } from 'react';
import { getSales } from '../utils/api';
import DatePicker from 'react-datepicker';
import { Loading } from './Loading';

import 'react-datepicker/dist/react-datepicker.css';

export const Sales = ({ salesType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2022-11-28'));
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getSales(startDate.toLocaleDateString(), salesType).then(({ sales }) => {
      setSales(sales);
      setIsLoading(false);
    });
  }, [startDate, salesType]);

  const teamNames = sales.map((salesEntry) => salesEntry.team);
  const uniqueTeamNames = [...new Set(teamNames)];

  const handleTeamFilter = (event) => {
    setTeamName(event.target.value);
  };

  if (isLoading) return <Loading />;
  return (
    <section className="all-sales-section">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
      />
      <select value={teamName} onChange={handleTeamFilter}>
        <option value="">All Sales</option>
        {uniqueTeamNames.map((team) => {
          return (
            <option key={team} value={team}>
              {team}
            </option>
          );
        })}
      </select>
      <ul className="sales-ul">
        <li className="sales-entry">
          <p className="sales-entry-element sales-entry-name">Name:</p>
          <p className="sales-entry-elemen sales-entry-name">Team:</p>
          <p className="sales-entry-element">Sales:</p>
        </li>
        {teamName
          ? sales
              .filter((sale) => sale.team === teamName)
              .map((salesEntry) => {
                return (
                  <li key={salesEntry.sales_entry_id} className="sales-entry">
                    <p className="sales-entry-element sales-entry-name">
                      {salesEntry.first_name} {salesEntry.surname}
                    </p>
                    <p className="sales-entry-element sales-entry-name">
                      {salesEntry.team}
                    </p>
                    <p className="sales-entry-element">
                      {salesEntry.sales_type}: {salesEntry.sales_number}
                    </p>
                  </li>
                );
              })
          : sales.map((salesEntry) => {
              return (
                <li key={salesEntry.sales_entry_id} className="sales-entry">
                  <p className="sales-entry-element sales-entry-name">
                    {salesEntry.first_name} {salesEntry.surname}
                  </p>
                  <p className="sales-entry-element sales-entry-name">
                    {salesEntry.team}
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
