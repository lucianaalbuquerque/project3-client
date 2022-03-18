import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchBtn from "../../components/catalogues/SearchBtn";

function CataloguePage() {
  const [page, setPage] = useState(null);
  const [productList, setProductList] = useState([]);
  const [productSelected, setProductSelected] = useState(false)
  const { pageId } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
 
  const getPage = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/page/${pageId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPage(response.data);
        console.log("page on CataloguePage.jsx:", response.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProductList(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPage();
    getAllProducts();
  }, []);

  const deletePage = (pageId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/page/${pageId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/catalogue/${page.catalogueId}`);
      })
      .catch((err) => console.log(err));
  };

  const closeSearch = () => {
    setProductSelected(true)
  }

  return (
    <div className="cataloguePage">
    
      {page && (
        <><div className='pageLayout'>
          
          {page.products.map((product) => {

            return (
            <div className='productLayout' key={product._id}>
            <img src={product.imageUrl} alt={product.name} />

              <div className='productInfo'>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.ref} - {product.price} €</p>
              </div>
            </div>)

          })}

          </div>
         
          <div className='layoutButtons'>
          <IconButton >
          <Link to={`/catalogue/${page.catalogueId}`}><KeyboardBackspaceIcon /></Link>
          </IconButton>
        
 
          <div className='searchBar'>
          {!productSelected && <SearchBtn
            products={productList} pageId={pageId} catalogueId={page.catalogueId} refreshPage={getPage} closeSearch={closeSearch} />
          } 
          </div>

          <IconButton onClick={() => deletePage(page._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
          </div>
        </>
      )}
    </div>
  );
}

export default CataloguePage;
