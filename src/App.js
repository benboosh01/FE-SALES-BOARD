import './App.css';
import { useState } from 'react';
import { Sales } from './Components/Sales';
import { SalesType } from './Components/SalesType';
import { Login } from './Components/Login';

function App() {
  const [salesTypeSelected, setSalesTypeSelected] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sales Board</h1>
      </header>
      <Login />
      <SalesType setSalesTypeSelected={setSalesTypeSelected} />
      <Sales salesType={salesTypeSelected} />
    </div>
  );
}

export default App;
