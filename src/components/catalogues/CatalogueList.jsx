import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CatalogueList() {
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
      }, [] );


  return (
    <div>
        <h3>Catalogues List</h3>
        { catalogueList.map((catalogue) => {
            return (
                <div key={catalogue._id} >
                <Link to={`/catalogue/${catalogue._id}`}> {/* //essa rota nao existe ainda!!! */}
                    <h3>{catalogue.name}</h3>
                </Link>
                </div> 
            )
        }) }
    </div>
  )
}

export default CatalogueList