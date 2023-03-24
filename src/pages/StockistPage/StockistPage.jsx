import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../components/general';
import styles from './styles.module.scss';

import StockistList from '../../components/stockists/StockistList';
import StockistAddForm from '../../components/stockists/StockistAddForm';
import StockistEditForm from '../../components/stockists/StockistEditForm';

function StockistPage() {
  const [stockists, setStockists] = useState([]);
  const [addForm, setAddForm] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [stockistDetail, setStockistDetail] = useState(null);
  const storedToken = localStorage.getItem('authToken');

  const getAllStockists = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/stockists`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => setStockists(response.data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getAllStockists();
  }, []);

  const toogleForm = () => {
    setAddForm(editForm);
    setEditForm(addForm);
  };

  const getStockistDetail = stockistId => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/stockist/${stockistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setStockistDetail(response.data);
        toogleForm();
      })
      .catch(error => console.log(error));
  };

  return (
    <Layout
      mainChildren={
        <div>
          <StockistList
            stockists={stockists}
            refreshStockists={getAllStockists}
            editStockist={getStockistDetail}
            showEditForm={toogleForm}
          />
          {editForm && <button onClick={toogleForm}>Add New</button>}
        </div>
      }
      sideChildren={
        <div>
          {addForm ? (
            <StockistAddForm refreshStockists={getAllStockists} />
          ) : (
            <StockistEditForm stockist={stockistDetail} refreshStockists={getAllStockists} />
          )}
        </div>
      }
    />
  );
}

export default StockistPage;
