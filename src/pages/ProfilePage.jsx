import React from 'react'
import { Link } from "react-router-dom";

import CatalogueList from '../components/catalogues/CatalogueList';
import CreateCatalogueBtn from '../components/catalogues/CreateCatalogueBtn';

function ProfilePage() {
  return (
    <div>
      <h2>Profile Page</h2>
      <Link to="/products">See all Products</Link>
      <Link to="/stockists">See all Stockists</Link>
      <CatalogueList />
      <CreateCatalogueBtn />
    </div>
  )
}

export default ProfilePage