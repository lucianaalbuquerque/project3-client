import React from 'react'
import './ProfilePage.css'
import { Link } from "react-router-dom";

import CatalogueList from '../../components/catalogues/CatalogueList';
import CreateCatalogueBtn from '../../components/catalogues/CreateCatalogueBtn';

function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="cataloguesHome">
        <CatalogueList />
        <CreateCatalogueBtn />
      </div>
      <div className='home2'>
      <div className="cardsHome">
        <Link to="/products">See all Products</Link>
      </div>
      <div className="cardsHome">
        <Link to="/stockists">See all Stockists</Link>
      </div>
      </div>
    </div>
  )
}

export default ProfilePage