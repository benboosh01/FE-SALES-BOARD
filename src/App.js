import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sales } from './Components/Sales';
import { SalesType } from './Components/SalesType';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Home } from './Components/Home';
import { Profile } from './Components/Profile';
import { UserSales } from './Components/UserSales';
import { MainNav } from './Components/MainNav';
import { UserSalesBoard } from './Components/UserSalesBoard';

function App() {
  const [salesTypeSelected, setSalesTypeSelected] = useState('cable');

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1 className="title">Salesboard</h1>
        </header>
        <MainNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <>
                <Profile />
                <SalesType
                  setSalesTypeSelected={setSalesTypeSelected}
                  salesTypeSelected={salesTypeSelected}
                />
                <UserSales salesType={salesTypeSelected} />
              </>
            }
          />
          <Route
            path="/sales"
            element={
              <>
                <SalesType
                  setSalesTypeSelected={setSalesTypeSelected}
                  salesTypeSelected={salesTypeSelected}
                />
                <Sales salesType={salesTypeSelected} />
              </>
            }
          />
          <Route path="/usersalesboard" element={<UserSalesBoard />} />
        </Routes>
      </div>

      <footer></footer>
    </div>
  );
}

export default App;
