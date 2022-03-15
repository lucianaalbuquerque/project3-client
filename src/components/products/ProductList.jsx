import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

function ProductsList(props) {
  const {products} = props
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    props.refreshProducts();
  }, [] ); 

  /* const editProduct = (productId) => {
    <Navigate to={'./ProductEditForm.jsx'} />
  } */

  const deleteProject = (productId) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/product/${productId}`, 
    { headers: { Authorization: `Bearer ${storedToken}` } } )
    .then((res) => { console.log(res.data) 
    props.refreshProducts() 
    })
    .catch((err) => console.log(err)); 
  };  

  return (
    <div>
      <h3>Products List</h3>
      {products.map((product) => {
        return (
          <div key={product._id} >
            <Navigate to={`/product/${product._id}`}>
              <h3>{product.name}</h3>
            </Navigate>
            {/* <button onClick={() => editProduct(product._id)}>Edit</button> */}
            <button onClick={() => deleteProject(product._id)}>Delete</button>
          </div> 
        )
      })}
    </div>
  )
}

export default ProductsList