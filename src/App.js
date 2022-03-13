import './App.css';
import { Routes, Route } from "react-router-dom";

import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import StockistPage from './pages/StockistPage/StockistPage';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import CatalogueCover from './pages/CatalogueCover';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={ <IsAnon> <HomePage /> </IsAnon>  } />
        <Route path="/profile" element={ <IsPrivate> <ProfilePage /></IsPrivate>  } /> 
        <Route path="/products" element={ <IsPrivate> <ProductPage /> </IsPrivate> } />
        <Route path="/stockists" element={ <IsPrivate> <StockistPage /> </IsPrivate> } />
        <Route path="/:catalogueId/cover" element={<CatalogueCover />} />
      </Routes>
    </div>
  );
}

export default App;
