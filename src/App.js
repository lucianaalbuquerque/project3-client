import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import StockistPage from './pages/StockistPage';
import Signup from './components/auth/Signup';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/product" element={ <ProductPage /> } />
        <Route path="/stockist" element={ <StockistPage /> } />
        <Route path="/signup" element={ <Signup /> } />
      </Routes>
    </div>
  );
}

export default App;
