import React from 'react'
import './StockistPage.css'

import StockistList from '../../components/stockists/StockistList'
import StockistAddForm from '../../components/stockists/StockistAddForm'
import StockistEditForm from '../../components/stockists/StockistEditForm'

function StockistPage() {
  return (
    <div className="stockistPage">
        <StockistList />
        <StockistAddForm />
        <StockistEditForm />
    </div>
  )
}

export default StockistPage