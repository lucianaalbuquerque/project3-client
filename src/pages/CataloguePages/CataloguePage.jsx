import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"; 
import SearchBtn from "../../components/catalogues/SearchBtn";

function CataloguePage() {

  const [page, setPage] = useState(null)
  const [productList, setProductList] = useState([])
  const { pageId } = useParams();  
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const getPage = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/page/${pageId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((response) => {
        setPage(response.data)
        console.log('page on CataloguePage.jsx:', response.data)
    })
    .catch((error) => console.log(error));
  }

  const getAllProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((response) => setProductList(response.data))
    .catch((error) => console.log(error));
}

  useEffect(() => {
    getPage();
    getAllProducts();
  }, [] );

  const deletePage = (pageId) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/page/${pageId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((res) => { console.log(res.data) 
      navigate(`/catalogue/${page.catalogueId}`)
    })
    .catch((err) => console.log(err)); 
  };

  return (
    <div className="cataloguePage">
    <SearchBtn products={productList} pageId={pageId} catalogueId={page.catalogueId} refreshPage={getPage} />
      {page && (<>
          {page.products.map((product) => { return (
            <p key={product._id}>{product.name}</p>
          )})}
          <Link to={`/catalogue/${page.catalogueId}`}>Back</Link>
      </>)}
      <button onClick={() => deletePage(page._id)}>Delete</button>
    </div>
  )
}

export default CataloguePage