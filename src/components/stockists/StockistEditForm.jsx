import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';

function StockistEditForm(props) {
  console.log(props)
  const { stockist } = props  
  const storedToken = localStorage.getItem('authToken');

  const [name, setName] = useState(stockist.name)
  const [description, setDescription] = useState(stockist.description)
  const [commission, setCommission] = useState(stockist.commission)

  function handleSubmit(e) {
    e.preventDefault();

    const requestBody = { name, description, commission };
    axios
      .put(`${process.env.REACT_APP_API_URL}/stockist/${stockist._id}`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response.data)
        props.refreshStockists()
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <TextField size="small" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
  
          <label>Description:</label>
          <TextField size="small"  type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Commission:</label>
          <TextField size="small"  type="number" name="commission" value={commission} onChange={(e) => setCommission(e.target.value)} />

          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default StockistEditForm