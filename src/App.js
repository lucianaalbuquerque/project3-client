import './App.css';
import { Routes, Route } from "react-router-dom";

import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import StockistPage from './pages/StockistPage';
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={ <IsAnon> <HomePage /> </IsAnon>  } />
        <Route path="/profile" element={ <IsPrivate> <ProfilePage /></IsPrivate>  } /> 
        <Route path="/products" element={ <IsPrivate> <ProductPage /> </IsPrivate> } />
        <Route path="/stockists" element={ <IsPrivate> <StockistPage /> </IsPrivate> } />
      </Routes>
    </div>
  );
}

export default App;
