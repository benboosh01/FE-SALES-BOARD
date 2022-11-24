import { useState, useEffect, useContext } from 'react';
import { addSales, getSales, getSalesTypes, updateSales } from '../utils/api';
import { UserContext } from '../contexts/user';
import DatePicker from 'react-datepicker';
import axios from 'axios';

export const UserSalesBoard = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [salesTypes, setSalesTypes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [salesNumber, setSalesNumber] = useState(0);
  const [salesType, setSalesType] = useState('');
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .all([
        getSalesTypes(),
        getSales(
          startDate.toLocaleDateString().slice(6, 10) +
            startDate.toLocaleDateString().slice(3, 5) +
            startDate.toLocaleDateString().slice(0, 2),
          null,
          loggedInUser.username
        ),
      ])
      .then(
        axios.spread((...allData) => {
          setSalesTypes(allData[0].salesTypes);
          setSales(allData[1].sales);
          setSalesType(allData[0].salesTypes[0].sales_type);
          setIsLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, loggedInUser.username]);

  const handleSalesType = (event) => {
    setSalesType(event.target.value);
  };

  const handleMinusSale = (event) => {
    event.preventDefault();
    setSalesNumber((currSalesNumber) => currSalesNumber - 1);
  };

  const handlePlusSale = (event) => {
    event.preventDefault();
    setSalesNumber((currSalesNumber) => currSalesNumber + 1);
  };

  const handleSubmit = (event) => {
    let salesEntryFound = false;
    event.preventDefault();
    const salesUpdate = {
      sales_user: loggedInUser.username,
      sales_date: parseInt(
        startDate.toLocaleDateString().slice(6, 10) +
          startDate.toLocaleDateString().slice(3, 5) +
          startDate.toLocaleDateString().slice(0, 2)
      ),
      sales_type: salesType,
      sales_number: salesNumber,
    };
    for (const sale of sales) {
      if (
        sale.sales_user === salesUpdate.sales_user &&
        sale.sales_date === salesUpdate.sales_date &&
        sale.sales_type === salesUpdate.sales_type
      ) {
        salesEntryFound = true;
        break;
      }
    }
    if (salesEntryFound) {
      const updateSalesEntry = {
        sales_user: loggedInUser.username,
        sales_date: parseInt(
          startDate.toLocaleDateString().slice(6, 10) +
            startDate.toLocaleDateString().slice(3, 5) +
            startDate.toLocaleDateString().slice(0, 2)
        ),
        sales_type: salesType,
        inc_sales: salesNumber,
      };
      updateSales(updateSalesEntry).then((sales) => {
        setSales((currSales) => {
          const updatedSales = currSales.filter((salesEntry) => {
            return (
              salesEntry.sales_date !== updateSalesEntry.sales_date &&
              salesEntry.sales_type !== updateSalesEntry.sales_type &&
              salesEntry.sales_user !== updateSalesEntry.sales_user
            );
          });
          return [...updatedSales, sales.salesEntry];
        });
      });
    } else {
      const newSalesEntry = {
        sales_user: loggedInUser.username,
        sales_date: parseInt(
          startDate.toLocaleDateString().slice(6, 10) +
            startDate.toLocaleDateString().slice(3, 5) +
            startDate.toLocaleDateString().slice(0, 2)
        ),
        sales_type: salesType,
        sales_number: salesNumber,
      };
      addSales(newSalesEntry).then((response) => {
        setSales((currSales) => {
          console.log(currSales, response.salesEntry);
          return [...currSales, response.salesEntry];
        });
      });
    }
    setSalesNumber(0);
  };

  const todaysSales = sales.filter(
    (salesEntry) =>
      salesEntry.sales_date ===
      parseInt(
        startDate.toLocaleDateString().slice(6, 10) +
          startDate.toLocaleDateString().slice(3, 5) +
          startDate.toLocaleDateString().slice(0, 2)
      )
  );

  if (isLoading) return <p>loading salesboard...</p>;
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={loggedInUser.username} required disabled />
        </label>
        <label>
          Sales Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
        </label>
        <label>
          Sales Type:
          <select value={salesType} onChange={handleSalesType}>
            {salesTypes.map((salesType) => {
              return (
                <option key={salesType.sales_type} value={salesType.sales_type}>
                  {salesType.sales_type}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Sales Change:
          <span>{salesNumber}</span>
          <button onClick={handleMinusSale}>-</button>
          <button onClick={handlePlusSale}>+</button>
          <input type="submit" value="Submit" />
        </label>
      </form>
      <ul>
        {todaysSales.map((salesEntry) => {
          return (
            <li key={salesEntry.sales_entry_id}>
              <p>{salesEntry.sales_date}</p>
              <p>{salesEntry.sales_type}</p>
              <p>{salesEntry.sales_number}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
