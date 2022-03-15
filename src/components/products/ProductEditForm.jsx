import { useState } from "react";
import axios from "axios";

function ProductEditForm(props) {
  const {product} = props
  const storedToken = localStorage.getItem('authToken');

  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [fileUpload, setFileUpload] = useState(null)
  const [imageUrl, setImageUrl] = useState(product.imageUrl)

  function handleSubmit(e) {
    e.preventDefault();
   /*  uploadImage() */
    const requestBody = { name, description, price, imageUrl };
    console.log(requestBody)
    axios
      .put(`${process.env.REACT_APP_API_URL}/product/${product._id}`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => { console.log(response.data)
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