import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StockistList() {
  const [stockistList, setStockistList] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getAllStockists = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/stockists`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((response) => setStockistList(response.data))
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllStockists();
  }, [] );

  return (
    <div>
        <h3>Stockist List</h3>
        {stockistList.map((stockist) => {
            return (
                <div key={stockist._id} >
              <Link to={`/stockist/${stockist._id}`}>
                <h3>{stockist.name}</h3>
              </Link>
            </div> 
            )
        })}
    </div>
  )
}

export default StockistList