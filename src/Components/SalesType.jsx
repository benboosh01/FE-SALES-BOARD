import { useState, useEffect } from 'react';
import { getSalesTypes } from '../utils/api';

export const SalesType = ({ setSalesTypeSelected }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [salesTypes, setSalesTypes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSalesTypes().then(({ salesTypes }) => {
      setSalesTypes(salesTypes);
      setIsLoading(false);
    });
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelection = (event) => {
    setSalesTypeSelected(event.target.value);
    setOpen(false);
  };

  if (isLoading) return <p>loading...</p>;
  return (
    <div onClick={handleOpen}>
      <p>Sales Types</p>
      {open ? (
        <ul>
          {salesTypes.map((salesType) => {
            return (
              <button
                onClick={handleSelection}
                key={salesType.sales_type}
                value={salesType.sales_type}
              >
                {salesType.sales_type}
              </button>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
