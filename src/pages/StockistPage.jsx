import React from 'react'

import StockistList from '../components/stockist/StockistList'
import StockistAddForm from '../components/stockist/StockistAddForm'
import StockistEditForm from '../components/stockist/StockistEditForm'

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