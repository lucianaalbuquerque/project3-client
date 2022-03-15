import { useEffect } from "react";
import axios from "axios";

function ProductsList(props) {
  const {products} = props
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    props.refreshProducts();
  }, [] ); 

  const handleEdit = (productId) => {
    props.editProduct(productId)
  } 

  const deleteProduct = (productId) => {
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
              <button onClick={() => handleEdit(product._id)}><h3>{product.name}</h3></button>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div> 
        )
      })}
    </div>
  )
}

export default ProductsList