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

function App() {
  const [salesTypeSelected, setSalesTypeSelected] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Salesboard</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
              <SalesType setSalesTypeSelected={setSalesTypeSelected} />
              <UserSales salesType={salesTypeSelected} />
            </>
          }
        />
        <Route
          path="/sales"
          element={
            <>
              <SalesType setSalesTypeSelected={setSalesTypeSelected} />
              <Sales salesType={salesTypeSelected} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
