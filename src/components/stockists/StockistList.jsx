import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StockistList(props) {
  const { stockists } = props;
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    props.refreshStockists();
  }, [] );

  const deleteStockist = (stockistId) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/stockist/${stockistId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((res) => { 
      console.log(res.data) 
      props.refreshStockists() 
    })
    .catch((err) => console.log(err)); 
  }; 

  return (
    <div>
        <h3>Stockist List</h3>
        {stockists.map((stockist) => {
            return (
                <div key={stockist._id} >
              <Link to={`/stockist/${stockist._id}`}>
                <h3>{stockist.name}</h3>
              </Link>
              <button onClick={() => deleteStockist(stockist._id)}>Delete</button>
            </div> 
            )
        })}
    </div>
  )
}

export default StockistList