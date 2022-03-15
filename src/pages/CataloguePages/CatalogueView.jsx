import './CataloguePages.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from 'react'

import CatalogueCover from './CatalogueCover'
import CataloguePage from './CataloguePage'
import CatalogueReport from './CatalogueReport'

import CreateCoverBtn from '../../components/catalogues/CreateCoverBtn';
import CreatePageBtn from '../../components/catalogues/CreatePageBtn';

function CatalogueView() {
  const [catalogue, setCatalogue] = useState(null)
  const [cover, setCover] = useState(null)
  const [pages, setPages] = useState([])
  const [report, setReport] = useState(null)

  const { catalogueId } = useParams()
  console.log('catalogueId on catalogue view',catalogueId)

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const getCatalogue = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/catalogue/${catalogueId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(res => {
        setCatalogue(res.data)
        setCover(res.data.cover)
        setPages(res.data.pages)
        setReport(res.data.report)
        console.log('catalogue', catalogue)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {                                   
    getCatalogue();
  }, []);

  const deleteCatalogue = (catalogueId) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/catalogue/${catalogueId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((res) => { console.log(res.data) 
      navigate('/profile')
    })
    .catch((err) => console.log(err)); 
  };


  return (
    <div className='viewAllCatalogue'>
    { catalogue && 
    
      ( <>
        <h3>{catalogue.name} </h3>
        <div className='viewAllPages'>
        <div className="pagina">
          { cover && <>
          <CatalogueCover /> {/* catalogueId={catalogueId} coverId={cover} */}
          <Link to={`/cover/${cover}`}>Edit</Link>
          </>}
          { !cover && <CreateCoverBtn catalogueId={catalogue._id}/> }
        </div>
        
          { pages && <>
          {pages.map((page) => {return (
            <div className="pagina" key={page}>
            <CataloguePage pageId={page} />
            <Link to={`/page/${page}`}>Edit</Link>
            </div>
            )})}
            </>}

          <div className="pagina">
            <CreatePageBtn catalogueId={catalogue._id}/>
          </div>
        
        <div className="pagina">
          { report && <CatalogueReport />}
          { !report && <button>Check Report</button> }
        </div>
      </div>
      <button onClick={() => deleteCatalogue(catalogue._id)}>Delete</button>
      </>)

    }
      
    </div>
  )
}

export default CatalogueView