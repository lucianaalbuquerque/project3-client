import { useState } from "react";
import axios from "axios";

function ProductAddForm(props) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
/*   const [selectedFile, setSelectedFile] = useState(null) */
  const [imageUrl, setImageUrl] = useState('')

  const storedToken = localStorage.getItem('authToken');
  
  const uploadImage = (file) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/upload`, file, 
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  const handleUpload = (e) => {
    console.log( '_________________ate aqui')
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    console.log('target', e.target.files[0])
    uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.fileUrl);
        console.log(response.fileUrl)
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  } 

 /* const imageSelected = (e) => {
    setSelectedFile(e.target.files[0])
  }

   const handleUpload = () => {
    
    const uploadData = new FormData();
    uploadData.append("imageUrl", selectedFile, selectedFile.name)
    axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData, 
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(res => {
        console.log('res.data.fileUrl', res.data.fileUrl)
        setImageUrl(res.data.fileUrl)
      })
      .catch(err => console.log('error uploading image:',err));
  } */

  function handleSubmit(e) {
    e.preventDefault();

    handleUpload()

    const requestBody = { name, description, price, imageUrl };
    console.log(' quando envio o form:', { name, description, price, imageUrl })

    axios
      .post(`${process.env.REACT_APP_API_URL}/product`, requestBody,
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
      <h3>Add Product</h3>
 
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
 
        <label>Description:</label>
        <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Image:</label>
        <input type="file" name="imageUrl" /*value={imageUrl}*/ onClick={(e) => handleUpload(e)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProductAddForm