import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom"; 

function CatalogueCover() {
    const [cover, setCover] = useState(null)
    const { catalogueId } = useParams(); 
    const storedToken = localStorage.getItem("authToken");

    const getCover = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/${catalogueId}/cover`, {},
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => {
            setCover(response.data)
            console.log('cover:', cover)
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getCover();
      }, [] );

  return (
    <div>
        <h2>Cover</h2>
        {cover.title}
        <canvas id="myCanvas" width="248" height="350">
        </canvas>
        <Link to={`/${catalogueId}/about`}>Next Page</Link>
    </div>
  )
}

export default CatalogueCover