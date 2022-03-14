import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCatalogueBtn() {

    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        /* const requestBody = { name: '', cover: null, about: null, pages: [], report: null }; */
        
        axios.get(`${process.env.REACT_APP_API_URL}/catalogue`, 
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
            console.log(response.data)
            navigate(`/${response.data._id}/cover`)
        })         
        .catch((error) => console.log(error));
    }


  return (
    <div>
        <form onSubmit={handleCreate}>
        <button type="submit">Create new catalogue</button>
        </form>
    </div>
  )
}

export default CreateCatalogueBtn