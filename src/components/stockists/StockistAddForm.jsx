import { useState } from 'react';
import axios from 'axios';

function StockistAddForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [commission, setCommission] = useState(0);

  const storedToken = localStorage.getItem('authToken');

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = { name, description, commission };

    axios
      .post(`${process.env.REACT_APP_API_URL}/stockist`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        props.refreshStockists();
        setName('');
        setDescription('');
        setCommission(0);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h3>Add Store</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label>Commission:</label>
        <input
          type="number"
          name="commission"
          value={commission}
          onChange={e => setCommission(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StockistAddForm;
