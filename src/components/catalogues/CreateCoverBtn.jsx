import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCoverBtn({catalogueId}) {

    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        
        axios.get(`${process.env.REACT_APP_API_URL}/${catalogueId}/cover`, 
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => {
            navigate(`/cover/${response.data._id}`)
        })
        .catch((error) => console.log(error));
    }

  return (
    <div>
        <form onSubmit={handleCreate}>
        <button type="submit">Create cover</button>
        </form>
    </div>
  )
}

export default CreateCoverBtn