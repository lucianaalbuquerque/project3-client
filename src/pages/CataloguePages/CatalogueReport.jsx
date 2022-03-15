import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"; 

function CatalogueReport() {
  const [report, setReport] = useState(null)
  const { pageId } = useParams(); 
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const getReport = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/report/${pageId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((response) => {
        setReport(response.data)
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getReport();
  }, [] );


  return (
    <div>
      <h3>Report</h3>
    </div>
  )
}

export default CatalogueReport