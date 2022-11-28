import { useState, useEffect, useContext } from 'react';
import { addSales, getSales, getSalesTypes, updateSales } from '../utils/api';
import { UserContext } from '../contexts/user';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { Loading } from './Loading';

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
        getSales(startDate.toLocaleDateString(), null, loggedInUser.username),
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
      sales_date: startDate.toLocaleDateString(),
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
        sales_date: startDate.toLocaleDateString(),
        sales_type: salesType,
        inc_sales: salesNumber,
      };
      updateSales(updateSalesEntry).then((sales) => {
        setSales((currSales) => {
          const updatedSales = currSales.filter((salesEntry) => {
            return (
              salesEntry.sales_date === updateSalesEntry.sales_date &&
              salesEntry.sales_type !== updateSalesEntry.sales_type &&
              salesEntry.sales_user === updateSalesEntry.sales_user
            );
          });
          return [...updatedSales, sales.salesEntry];
        });
      });
    } else {
      const newSalesEntry = {
        sales_user: loggedInUser.username,
        sales_date: startDate.toLocaleDateString(),
        sales_type: salesType,
        sales_number: salesNumber,
      };
      addSales(newSalesEntry).then((response) => {
        setSales((currSales) => {
          return [...currSales, response.salesEntry];
        });
      });
    }
    setSalesNumber(0);
  };

  const todaysSales = sales.filter(
    (salesEntry) => salesEntry.sales_date === startDate.toLocaleDateString()
  );

  if (isLoading) return <Loading />;
  return (
    <section>
      <form onSubmit={handleSubmit} className="user-sales-form">
        <label>Username:</label>
        <input type="text" value={loggedInUser.username} required disabled />

        <label>Sales Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
        />

        <label>Sales Type:</label>
        <select value={salesType} onChange={handleSalesType}>
          {salesTypes.map((salesType) => {
            return (
              <option key={salesType.sales_type} value={salesType.sales_type}>
                {salesType.sales_type}
              </option>
            );
          })}
        </select>

        <label>Sales Change:</label>
        <span className="sales-board-number">{salesNumber}</span>
        <div className="sales-change-div">
          <button
            onClick={handleMinusSale}
            className="app-btn sales-change-btn"
          >
            -
          </button>
          <button onClick={handlePlusSale} className="app-btn sales-change-btn">
            +
          </button>
        </div>
        <input type="submit" value="Submit" className="app-btn" />
      </form>
      <section className="user-sales-section">
        <h3>Sales Processed:</h3>
        <ul className="sales-ul">
          {todaysSales.map((salesEntry) => {
            return (
              <li key={salesEntry.sales_entry_id} className="sales-entry">
                <p className="sales-entry-date">
                  {salesEntry.sales_date.toString()}
                </p>
                <p className="sales-entry-number">
                  {salesEntry.sales_type}: {salesEntry.sales_number}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};
