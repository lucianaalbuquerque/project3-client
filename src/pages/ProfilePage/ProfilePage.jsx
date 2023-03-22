import { useState, useEffect } from 'react';
import axios from "axios";
import './ProfilePage.css'
import { Link } from "react-router-dom";

import CatalogueList from '../../components/catalogues/CatalogueList';
import CreateCatalogueBtn from '../../components/catalogues/CreateCatalogueBtn';

function ProfilePage() {
  const [catalogueList, setCatalogueList] = useState([])
  const storedToken = localStorage.getItem("authToken");

  const getAllCatalogues = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/catalogues`, 
      { headers: { Authorization: `Bearer ${storedToken}` } } )
      .then((response) => setCatalogueList(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
      getAllCatalogues();
  }, []);
  
  return (
    <div className="profilePage">
      <div className="cataloguesHome">
        <CatalogueList catalogueList={catalogueList} />
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