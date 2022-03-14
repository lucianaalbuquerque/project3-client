import './App.css';
import { Routes, Route } from "react-router-dom";


import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import StockistPage from './pages/StockistPage/StockistPage';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import CatalogueView from './pages/CataloguePages/CatalogueView';
import CatalogueCover from './pages/CataloguePages/CatalogueCover';
import CataloguePage from './pages/CataloguePages/CataloguePage';
import CatalogueReport from './pages/CataloguePages/CatalogueReport';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={ <IsAnon> <HomePage /> </IsAnon>  } />
        <Route path="/profile" element={ <IsPrivate> <ProfilePage /> </IsPrivate>  } /> 
        <Route path="/products" element={ <IsPrivate> <ProductPage /> </IsPrivate> } />
        <Route path="/stockists" element={ <IsPrivate> <StockistPage /> </IsPrivate> } />
        <Route path="/catalogue/:catalogueId" element={ <IsPrivate> <CatalogueView /> </IsPrivate> } />
        <Route path="/:catalogueId/cover" element={ <IsPrivate> <CatalogueCover/> </IsPrivate> } />
        <Route path="/page/:pageId" element={ <IsPrivate> <CataloguePage /> </IsPrivate> } />
        <Route path="/lastpage/:pageId" element={ <IsPrivate> <CatalogueReport /> </IsPrivate> } />
      </Routes>
    </div>
  );
}

export default App;
