import React from 'react'

import StockistList from '../components/stockists/StockistList'
import StockistAddForm from '../components/stockists/StockistAddForm'
import StockistEditForm from '../components/stockists/StockistEditForm'

function StockistPage() {
  return (
    <div>
        <h3>Stockist Page</h3>
        <StockistList />
        <StockistAddForm />
        <StockistEditForm />
    </div>
  )
}

export default StockistPage