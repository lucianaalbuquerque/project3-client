import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';

import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"; 
import Report from '../../components/Report'
import SearchStockistBtn from '../../components/catalogues/SearchStockistBtn';

function CatalogueReport() {
  const [report, setReport] = useState(null)
  const [stockistList, setStockistList] = useState([]);
  const [catalogueProducts, setCatalogueProducts] = useState([]);
  const [commission, setCommission] = useState(0)
  const { pageId, catalogueId } = useParams(); 
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate()

  console.log('catalogue products:', catalogueProducts)

  const catalogueProductList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/catalogue-products/${catalogueId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setCatalogueProducts(response.data.products))
      .catch((error) => console.log(error));
  };

  const getReport = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/${catalogueId}/report/${pageId}`, 
      { headers: { Authorization: `Bearer ${storedToken}` } } );
      await setReport(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const getAllStockists = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/stockists`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setStockistList(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getReport();
    getAllStockists();
    catalogueProductList();
  }, [] );

  const selectStockist = (value) => {
    setCommission(value.commission)
    
  }
 /*  const closeSearch = () => {
    setProductSelected(true)
  } */

  return (
    <div className="reportPage">
      { report && (<>
          <div className='searchBar'>
            {/* {stockistSelected &&  ........ }*/}
            <SearchStockistBtn
              stockists={stockistList} pageId={pageId} catalogueId={report.catalogueId} 
              refreshPage={getReport} selectStockist={selectStockist} /> 
            {/* closeSearch={closeSearch} incluir no props? */}
          </div>
        <Report commission={commission} productList={catalogueProducts} />
        <IconButton >
          <Link to={`/catalogue/${report.catalogueId}`}><KeyboardBackspaceIcon /></Link>
        </IconButton>
      </>)}
    </div>
  )
}

export default CatalogueReport