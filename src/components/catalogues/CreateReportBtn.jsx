import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateReportBtn({catalogueId}) {
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");

        axios.get(`${process.env.REACT_APP_API_URL}/lastpage/${catalogueId}`, 
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => {
            navigate(`/${catalogueId}/report/${response.data._id}`) 
        })
        .catch((error) => console.log(error));
    }

    return (
    <div>
        <form onSubmit={handleCreate}>
            <button type="submit">Check Report</button>
        </form>
    </div>
  )
}

export default CreateReportBtn