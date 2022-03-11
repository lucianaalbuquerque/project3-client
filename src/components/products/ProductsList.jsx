import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProductsList() {
    const [products, setProducts] = useState([])

    const getAllProducts = () => {
        axios.get(`${API_URL}/api/products`)
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