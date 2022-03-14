import axios from 'axios'
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'

import CatalogueCover from './CatalogueCover'
import CataloguePage from './CataloguePage'
import CatalogueReport from './CatalogueReport'

function CatalogueView() {
  const [catalogue, setCatalogue] = useState(null)
  const { catalogueId } = useParams()
  const [cover, setCover] = useState(null)
  const [pages, setPages] = useState(null)
  const [report, setReport] = useState(null)
  const storedToken = localStorage.getItem("authToken");

const getCatalogue = () => {
  axios.get(`${process.env.REACT_APP_API_URL}/catalogue/${catalogueId}`, 
  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(res => {
      console.log('no client: ', res.data)
      setCatalogue(res.data)
    })
    .catch(err => console.log(err));
}

useEffect(() => {                                   
  getCatalogue();
}, []);



  return (
    <div>
    { catalogue && 
    
      (
        <><h3>{catalogue.image}</h3>
      { cover && <CatalogueCover />}
      { !cover && <button>Create Cover</button> }

      { pages && <CataloguePage />}
      { !pages && <button>Create pages</button> }

      { report && <CatalogueReport />}
      { !report && <button>Check Report</button> }</>)

    }
      
    </div>
  )
}

export default CatalogueView