import { useState, useEffect } from 'react';
import { getSalesTypes } from '../utils/api';
import { Loading } from './Loading';

export const SalesType = ({ setSalesTypeSelected, salesTypeSelected }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [salesTypes, setSalesTypes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getSalesTypes().then(({ salesTypes }) => {
      setSalesTypes(salesTypes);
      setIsLoading(false);
    });
  }, []);

  const handleSelection = (event) => {
    setSalesTypeSelected(event.target.value);
  };

  const activeStyle = {
    textDecoration: 'underline',
  };

  if (isLoading) return <Loading />;
  return (
    <section className="sales-types-section">
      <p>Sales Types</p>
      <ul className="sales-type-ul">
        {salesTypes.map((salesType) => {
          return (
            <button
              className="app-btn"
              onClick={handleSelection}
              key={salesType.sales_type}
              value={salesType.sales_type}
              style={
                salesTypeSelected === salesType.sales_type
                  ? activeStyle
                  : undefined
              }
            >
              {salesType.sales_type}
            </button>
          );
        })}
      </ul>
    </section>
  );
};
