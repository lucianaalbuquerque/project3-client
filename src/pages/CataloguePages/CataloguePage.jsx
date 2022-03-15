import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom"; 

function CataloguePage() {
  const [page, setPage] = useState(null)
  const { pageId } = useParams();  
  const storedToken = localStorage.getItem("authToken");

  const getPage = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/page/${pageId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((response) => {
        setPage(response.data)
        console.log('page on CataloguePage.jsx:', response.data)
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getPage();
  }, [] );

  return (
    <div>
    CataloguePage
    
        {page && (<>
            <p>{page.pageNumber}</p>
            <Link to={`/catalogue/${page.catalogueId}`}>Back</Link>
        </>)}
    </div>
  )
}

export default CataloguePage