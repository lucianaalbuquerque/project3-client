import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom"; 

function CatalogueCover(props) {
    const [cover, setCover] = useState(null)
    const { pageId } = useParams(); 
    const storedToken = localStorage.getItem("authToken");

    const getCover = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/cover/${pageId}`, 
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => {
            setCover(response.data)
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getCover();
    }, [] );

  return (
    <div className="cataloguePage">
        <div className='pageLayout'>
        {cover && (<>
            <p>{cover.title}</p>
            <img src={cover.image} alt={cover.name} />
            <Link to={`/catalogue/${cover.catalogueId}`}>Back</Link>
        </>)}
        </div>
    </div>
  )
}

export default CatalogueCover