import './App.css';
import { useState, useContext } from 'react';
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
import { UserContext } from './contexts/user';

function App() {
  const [salesTypeSelected, setSalesTypeSelected] = useState('');
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLogOut = () => {
    setLoggedInUser({});
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Salesboard</h1>
        {loggedInUser.username ? (
          <button onClick={handleLogOut}>Log out</button>
        ) : null}
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
  );
}

export default App;
