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
      <div className="cardsHome">
        <Link to="/products">See all Products</Link>
        <Link to="/stockists">See all Stockists</Link>
      </div>
      
    </div>
  )
}

export default ProfilePage