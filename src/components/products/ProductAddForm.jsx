import { useState } from "react";
import axios from "axios";

function ProductAddForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const requestBody = { name, description, price, imageUrl };
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/product`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setName("");
        setDescription("");
        setPrice(0)
        setImageUrl('')
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Product</h3>
 
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
 
        <label>Description:</label>
        <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Image:</label>
        <input type="text" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProductAddForm