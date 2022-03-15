import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductEditForm(props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [fileUpload, setFileUpload] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const storedToken = localStorage.getItem('authToken');
  const { productId } = useParams();      

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/${productId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const oneProduct = response.data;
        setName(oneProduct.name);
        setDescription(oneProduct.description);
        setPrice(oneProduct.Price);
        setImageUrl(oneProduct.imageUrl)
      })
      .catch((error) => console.log(error));
    
  }, [productId]);

  function handleSubmit(e) {
    e.preventDefault();
   /*  uploadImage() */
    const requestBody = { name, description, price, imageUrl };
    axios
      .put(`${process.env.REACT_APP_API_URL}/product/${productId}`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        props.refreshProducts()
        setName("");
        setDescription("");
        setPrice(0);
        setImageUrl('');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h3>Edit Product</h3>
 
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Image:</label>
        <input type="file" name="imageUrl" /*value={imageUrl} onChange={(e) => handleFileUpload(e)}*/ />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProductEditForm