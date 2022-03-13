import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCatalogueBtn() {
    const [newCatalogue, setNewCatalogue] = useState(null)
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        
        axios.post(`${process.env.REACT_APP_API_URL}/catalogue`, null, /* PRECISA DESSE NULL ? */
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
            setNewCatalogue(response)
            })
        .then(() => {
            navigate(`/${newCatalogue._id}/cover`)
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