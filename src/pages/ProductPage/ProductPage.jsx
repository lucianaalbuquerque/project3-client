import { useEffect, useState } from 'react'
import axios from 'axios'
import './Products.css'

import ProductsList from '../../components/products/ProductList'
import ProductAddForm from '../../components/products/ProductAddForm'
import ProductEditForm from '../../components/products/ProductEditForm'

function ProductPage() {
  const [products, setProducts] = useState([])
  const storedToken = localStorage.getItem("authToken");

  const getAllProducts = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/products`, 
      { headers: { Authorization: `Bearer ${storedToken}` } } )
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllProducts();
  }, [] );

  return (
    <div className="ProductPage">
        <ProductsList products={products} refreshProducts={getAllProducts} />
        <ProductAddForm refreshProducts={getAllProducts} />
        <ProductEditForm refreshProducts={getAllProducts} />
    </div>
  )
}

export default ProductPage