
import { useState } from 'react';
import axios from 'axios';

function ProductAddForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [ref, setRef] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const storedToken = localStorage.getItem('authToken');

  const handleSubmit = async e => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('file', imageUrl);

    const upload = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    const requestBody = { name, description, ref, price, imageUrl: upload.data.fileUrl };

    axios
      .post(`${process.env.REACT_APP_API_URL}/product`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        props.refreshProducts();
        setName('');
        setDescription('');
        setPrice(0);
        setRef(0);
        setImageUrl('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h3>Add Product</h3>

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

        <label>Retail Price:</label>
        <input type="number" name="price" value={price} onChange={e => setPrice(e.target.value)} />

        <label>Ref:</label>
        <input type="number" name="ref" value={ref} onChange={e => setRef(e.target.value)} />

        <label>Image:</label>
        <input
          type="file"
          name="imageUrl"
          accept="image/jpeg"
          onChange={e => setImageUrl(e.target.files[0])}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductAddForm;
