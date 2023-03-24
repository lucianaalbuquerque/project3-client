
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCatalogueBtn() {

    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        
        axios.get(`${process.env.REACT_APP_API_URL}/catalogue`, 
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
            console.log(response.data)
            navigate(`/catalogue/${response.data._id}`)
        })         
        .catch((error) => console.log(error));
    }


  return (
    <div>
        <form onSubmit={handleCreate}>
        <button type="submit">Create</button>
        </form>
    </div>
  )
}

export default CreateCatalogueBtn