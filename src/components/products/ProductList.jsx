import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductsList() {
    const [products, setProducts] = useState([])
    const storedToken = localStorage.getItem("authToken");

    const getAllProducts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/products`, 
        { headers: { Authorization: `Bearer ${storedToken}` } } )
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getAllProducts();
      }, [] );

  return (
    <div>
        <h3>Products List</h3>
        {products.map((product) => {
            return (
                <div key={product._id} >
              <Link to={`/product/${product._id}`}>
                <h3>{product.name}</h3>
              </Link>
            </div> 
            )
        })}
    </div>
  )
}

export default ProductsList