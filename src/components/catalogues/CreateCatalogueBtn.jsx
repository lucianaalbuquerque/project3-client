import { useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function CreateCatalogueBtn() {

    const handleCreate = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        axios.post(`${process.env.REACT_APP_API_URL}/catalogue`, 
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => {
        console.log(response.data) ;
        /*   authenticateUser();
        <Navigate to="/${catalogueId}/cover" /> */
        })
        .catch((error) => console.log(error));
    }


  return (
    <div>
        
            <button onClick={handleCreate}>Create new catalogue</button>
        
    </div>
  )
}

export default CreateCatalogueBtn