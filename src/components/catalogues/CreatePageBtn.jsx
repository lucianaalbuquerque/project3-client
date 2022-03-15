import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePageBtn({catalogueId}) {
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        
        axios.get(`${process.env.REACT_APP_API_URL}/addpage/${catalogueId}`, 
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => {
            navigate(`/page/${response.data._id}`) 
//I create a page and receive the catalogue as response. Ive tried to use unshift instead of push but didnt worked
            console.log('response from createPageBtn', response.data.pages[0])
        })
        .catch((error) => console.log(error));
    }

  return (
    <div>
        <form onSubmit={handleCreate}>
        <button type="submit">Add Page</button>
        </form>
    </div>
  )
}

export default CreatePageBtn