import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../components/general';
// import styles from './styles.module.scss';
import './Products.css';

import ProductsList from '../../components/products/ProductList';
import ProductAddForm from '../../components/products/ProductAddForm';
import ProductEditForm from '../../components/products/ProductEditForm';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [addForm, setAddForm] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const storedToken = localStorage.getItem('authToken');

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const toogleForm = () => {
    setAddForm(editForm);
    setEditForm(addForm);
  };

  const getProductDetail = productId => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setProductDetail(response.data);
        toogleForm();
      })
      .catch(error => console.log(error));
  };

  return (
    <Layout
      mainChildren={
        <div>
          <ProductsList
            products={products}
            refreshProducts={getAllProducts}
            editProduct={getProductDetail}
            showEditForm={toogleForm}
          />
          {editForm && <button onClick={toogleForm}>+</button>}
        </div>
      }
      sideChildren={
        addForm ? (
          <ProductAddForm refreshProducts={getAllProducts} />
        ) : (
          <ProductEditForm
            product={productDetail}
            refreshProducts={getAllProducts}
            toogleForm={toogleForm}
          />
        )
      }
    />
  );
}

export default ProductPage;
