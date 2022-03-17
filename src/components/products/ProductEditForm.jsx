import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';

function ProductEditForm(props) {
  const {product} = props
  const storedToken = localStorage.getItem('authToken');

  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [costPrice, setCostPrice] = useState(product.costPrice)
  const [ref, setRef] = useState(product.price)
  const [handleImage, setHandleImage] = useState('')
  const [imageUrl, setImageUrl] = useState(product.imageUrl)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //upload image
    if (handleImage) {
    const uploadData = new FormData();
    uploadData.append("file", handleImage);

    const upload = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData,
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    setImageUrl(upload.data.fileUrl)
    }

    const requestBody = { name, description, price, costPrice, ref, imageUrl };
    console.log( handleImage)
    axios
      .put(`${process.env.REACT_APP_API_URL}/product/${product._id}`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response.data)
        props.refreshProducts()
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h3>Edit Product</h3>
      <img src={product.imageUrl} alt={product} />
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <TextField size="small" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <TextField size="small"  type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Cost Price:</label>
        <TextField size="small" type="number" name="costPrice" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />

        <label>Retail Price:</label>
        <TextField size="small" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Ref:</label>
        <TextField size="small" type="number" name="ref" value={ref} onChange={(e) => setRef(e.target.value)} />

        <label>Image:</label>
        <TextField size="small"  type="file" name="imageUrl" onChange={(e) => setHandleImage(e.target.files[0])} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProductEditForm