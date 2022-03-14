import { useState } from "react";
import axios from "axios";

function ProductAddForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [fileUpload, setFileUpload] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const storedToken = localStorage.getItem('authToken');

  /* const uploadImage = (file) => {
    axios.post(`${process.env.REACT_APP_API_URL}/product/upload`, file, 
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  const handleFileUpload = (e) => {
    setImageUrl(e.target.files[0])
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0])
    uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.fileUrl);
        console.log(imageUrl)
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  } */

  const handleFileUpload = (e) => {
    setFileUpload(e.target.files[0])
  }

  const uploadImage = () => {
    
    const uploadData = new FormData();
    uploadData.append("fileUpload", fileUpload, fileUpload.name)
    axios.post(`${process.env.REACT_APP_API_URL}/product/upload`, uploadData, 
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(res => {
        console.log('res.data.fileUrl', res.data.fileUrl)
        setImageUrl(res.data.fileUrl)} )
      .catch(err => console.log('error uploading image:',err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    uploadImage()

    const requestBody = { name, description, price, imageUrl };
    console.log(' quando envio o form:', { name, description, price, imageUrl })

    axios
      .post(`${process.env.REACT_APP_API_URL}/product`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setName("");
        setDescription("");
        setPrice(0);
        setImageUrl('');
      })
      .catch((error) => console.log(error));
  }

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
        <input type="file" name="imageUrl" /*value={imageUrl}*/ onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProductAddForm