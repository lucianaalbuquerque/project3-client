import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../../components/general';
import styles from './styles.module.scss';

import CatalogueList from '../../components/catalogues/CatalogueList';
import CreateCatalogueBtn from '../../components/catalogues/CreateCatalogueBtn';

function ProfilePage() {
  const [catalogueList, setCatalogueList] = useState([]);
  const storedToken = localStorage.getItem('authToken');

  const getAllCatalogues = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/catalogues`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => setCatalogueList(response.data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getAllCatalogues();
  }, []);

  return (
    <Layout
      mainChildren={
        <>
          <CatalogueList catalogueList={catalogueList} />
          <CreateCatalogueBtn />
        </>
      }
      sideChildren={
        <div>
          <div className={styles.smallTab}>
            <Link to="/products">Products</Link>
          </div>
          <div className={styles.smallTab}>
            <Link to="/stockists">Stockists</Link>
          </div>
        </div>
      } 
    />
  );
}

export default ProfilePage;
