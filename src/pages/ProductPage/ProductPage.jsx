import React from 'react'

import ProductsList from '../../components/products/ProductList'
import ProductAddForm from '../../components/products/ProductAddForm'
import ProductEditForm from '../../components/products/ProductEditForm'
import './Products.css'

function ProductPage() {
  return (
    <div className="ProductPage">
        <ProductsList />
        <ProductAddForm />
        <ProductEditForm />
    </div>
  )
}

export default ProductPage