import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StockistEditForm(props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [commission, setCommission] = useState(0)

  const storedToken = localStorage.getItem('authToken');
  const { stockistId } = useParams();    

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/stockist/${stockistId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const oneStockist = response.data;
        setName(oneStockist.name);
        setDescription(oneStockist.description);
        setCommission(oneStockist.commission);
      })
      .catch((error) => console.log(error));
    
  }, [stockistId]);

  function handleSubmit(e) {
    e.preventDefault();

    const requestBody = { name, description, commission };
    axios
      .put(`${process.env.REACT_APP_API_URL}/stockist/${stockistId}`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        props.refreshProducts()
        setName("");
        setDescription("");
        setCommission(0);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
  
          <label>Description:</label>
          <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Commission:</label>
          <input type="number" name="commission" value={commission} onChange={(e) => setCommission(e.target.value)} />

          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default StockistEditForm