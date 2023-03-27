import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';

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
    <div className={styles.form}>
      <div className={styles.bigTab}>
        <h2>Add Product</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input type="number" name="price" placeholder="Retail Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="number" name="ref" placeholder="Ref" value={ref} onChange={e => setRef(e.target.value)} />

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
