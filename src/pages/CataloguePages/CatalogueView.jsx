import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

import './CataloguePages.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from 'react'

import CreateCoverBtn from '../../components/catalogues/CreateCoverBtn';
import CreatePageBtn from '../../components/catalogues/CreatePageBtn';
import CreateReportBtn from '../../components/catalogues/CreateReportBtn';

function CatalogueView() {
  const [catalogue, setCatalogue] = useState(null)
  const [productList, setProductList] = useState([]) 
  const [title, setTitle] = useState("")
  const [editTitle, setEditTitle] = useState(false)

  const { catalogueId } = useParams()

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const getCatalogue = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/catalogue/${catalogueId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(res => {
        setCatalogue(res.data)
        setTitle(res.data.name)
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {name: title}
    axios
    .put(`${process.env.REACT_APP_API_URL}/catalogue/${catalogueId}`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((res) => { 
      console.log(res.data) 
      setTitle(res.data);
    })
    .catch((err) => console.log(err)); 
    setEditTitle(false)
  }


  return (
    <div>
    { catalogue && 
    
      ( <div className='catalogueView'>
        {!editTitle ? (
          <div className='formTitle'>
            <h3>{catalogue.name}</h3>
            <button onClick={() => setEditTitle(true)}>Edit</button>
          </div>
        ):(
          <>
            <form className='formTitle' onSubmit={handleFormSubmit}>
              <TextField size="small"  type="text" value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
              <button type="submit">Save</button>
            </form>
          </>
        )}


        <div className='previewCatalogue'>
          <div className='previewPage'>
            { catalogue.cover && <>
              {catalogue.cover.title}
            <Link to={`/cover/${catalogue.cover._id}`}>Edit</Link>
            </>}
            { !catalogue.cover && <CreateCoverBtn catalogueId={catalogue._id}/> }
          </div>
        
          { catalogue.pages && <>
          { catalogue.pages.map((page) => {return (
              <div className='previewPage' key={page._id}>
              <Link to={`/page/${page._id}`}>Edit</Link>
              </div>
            )}) }
            </>}

          <div className='previewPage'>
            <CreatePageBtn catalogueId={catalogue._id}/>
          </div>
        
          <div className='previewPage'>
          { catalogue.report && 
          <>
          <Link to={`/${catalogueId}/report/${catalogue.report._id}`}>Products Summary</Link>
          </>}
          { !catalogue.report && <CreateReportBtn catalogueId={catalogue._id} products={productList} /> }
          </div>
      </div>
      
        <IconButton onClick={() => deleteCatalogue(catalogue._id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      
      </div>)

    }
      
    </div>
  )
}

export default CatalogueView