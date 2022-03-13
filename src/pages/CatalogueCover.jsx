import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom"; 

function CatalogueCover() {
    const [cover, setCover] = useState(null)
    const { catalogueId } = useParams(); 
    const storedToken = localStorage.getItem("authToken");

    const getCover = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/${catalogueId}/cover`, 
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => setCover(response.data))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getCover();
      }, [] );

  return (
    <div>
     <img src={cover.image} alt="" />     
        <Link to={`/${catalogueId}/about`} />
    </div>
  )
}

export default CatalogueCover