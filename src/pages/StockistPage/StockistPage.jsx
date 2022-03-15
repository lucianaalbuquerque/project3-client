import { useEffect, useState } from 'react'
import axios from 'axios'
import './StockistPage.css'

import StockistList from '../../components/stockists/StockistList'
import StockistAddForm from '../../components/stockists/StockistAddForm'
import StockistEditForm from '../../components/stockists/StockistEditForm'

function StockistPage() {
  const [stockists, setStockists] = useState([])
  const storedToken = localStorage.getItem("authToken");

  const getAllStockists = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/stockists`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((response) => setStockists(response.data))
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllStockists();
  }, [] );

  return (
    <div className="stockistPage">
        <StockistList stockists={stockists} refreshStockists={getAllStockists} />
        <StockistAddForm refreshStockists={getAllStockists} />
        <StockistEditForm />
    </div>
  )
}

export default StockistPage