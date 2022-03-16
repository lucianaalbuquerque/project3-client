import './CataloguePages.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';

import CreateCoverBtn from '../../components/catalogues/CreateCoverBtn';
import CreatePageBtn from '../../components/catalogues/CreatePageBtn';
import CreateReportBtn from '../../components/catalogues/CreateReportBtn';

function CatalogueView() {
  const [catalogue, setCatalogue] = useState(null)
  const [productList, setProductList] = useState([]) 

  const { catalogueId } = useParams()


  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const getCatalogue = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/catalogue/${catalogueId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(res => {
        setCatalogue(res.data)
      })
      .catch(err => console.log(err));
  }

  const getProductList = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((response) => setProductList(response.data))
    .catch((error) => console.log(error));
  }

  useEffect(() => {                                   
    getCatalogue();
    getProductList();
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
    <div>
    { catalogue && 
    
      ( <>
        <h3>{catalogue.name} </h3>
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
          <Paper elevation={3}>
            { catalogue.cover && <>
              {catalogue.cover.title}
            <Link to={`/cover/${catalogue.cover._id}`}>Edit</Link>
            </>}
            { !catalogue.cover && <CreateCoverBtn catalogueId={catalogue._id}/> }
          </Paper>
        
          { catalogue.pages && <>
          { catalogue.pages.map((page) => {return (
              <Paper elevation={3} key={page._id}>
              {/* <CataloguePage pageId={page} products={productList}/> */}
              <Link to={`/page/${page._id}`}>Edit</Link>
              </Paper>
            )}) }
            </>}

          <Paper elevation={3}>
            <CreatePageBtn catalogueId={catalogue._id}/>
          </Paper>
        
          <Paper elevation={3}>
          { catalogue.report && 
          <>
          <p>Report</p>
          <Link to={`/report/${catalogue.report._id}`}>Check</Link>
          </>}
          { !catalogue.report && <CreateReportBtn catalogueId={catalogue._id} products={productList} /> }
          </Paper>
      </Box>
      <button onClick={() => deleteCatalogue(catalogue._id)}>Delete</button>
      </>)

    }
      
    </div>
  )
}

export default CatalogueView