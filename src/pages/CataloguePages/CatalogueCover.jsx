import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TextField from '@mui/material/TextField';

import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom"; 
import './CataloguePages.css'

function CatalogueCover() {
    const [cover, setCover] = useState(null)
    const [image, setImage] = useState('')
/*     const [imageSelected, setImageSelected] = useState(false) */
    const { pageId } = useParams(); 
    console.log('imageSelected',image,'cover', cover)
    const storedToken = localStorage.getItem("authToken");

    console.log(cover)

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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
           /*  setImageSelected(true) */
            const uploadData = new FormData();
            uploadData.append("file", image);
    
            const upload = await axios.post(
            `${process.env.REACT_APP_API_URL}/upload`,
            uploadData,
            { headers: { Authorization: `Bearer ${storedToken}` } }
            );
    
            const requestBody = { image: upload.data.fileUrl };
            console.log(' the requestBody quando envio image to cover:', requestBody )
      
            await axios
            .put(`${process.env.REACT_APP_API_URL}/cover/${pageId}`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
          })
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <div className="catalogueCover">
        
        {cover && (
            <>
            <div className='coverLayout'>
                <h2 className="coverTitle">{cover.catalogueId.name}</h2>
                
                { image ? 
                <>
                    <div className="imageCover" style={{ backgroundImage: `url(${cover.image})` }}></div>
                </> : <>
                    <form onSubmit={handleSubmit}>
                        <TextField size="small"  type="file" name="image" accept="image/jpeg" onChange={(e) => setImage(e.target.files[0])} required/>
                        <button type="submit">Submit</button>
                    </form>
                </>}
            </div>

            <IconButton >
                <Link to={`/catalogue/${cover.catalogueId._id}`}><KeyboardBackspaceIcon /></Link>
            </IconButton>
            </>
        )}
        
    </div>
  )
}

export default CatalogueCover