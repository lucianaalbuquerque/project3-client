import { useEffect } from "react";
import axios from "axios";

function StockistList(props) {
  const { stockists } = props;
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    props.refreshStockists();
  }, [] );

  const handleEdit = (stockistId) => {
    props.editStockist(stockistId) 
  } 

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
              <button onClick={() => handleEdit(stockist._id)}><h3>{stockist.name}</h3></button>
              <button onClick={() => deleteStockist(stockist._id)}>Delete</button>
            </div> 
            )
        })}
    </div>
  )
}

export default StockistList