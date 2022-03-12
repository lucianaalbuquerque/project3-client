import React from 'react'

import ProductsList from '../components/products/ProductList'
import ProductAddForm from '../components/products/ProductAddForm'
import ProductEditForm from '../components/products/ProductEditForm'

function ProductPage() {
  return (
    <div>
        <h3>Product Page</h3>
        <ProductsList />
        <ProductAddForm />
        <ProductEditForm />
    </div>
  )
}

export default ProductPage