import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);

  return (
    <nav>
        <Link to="/">Home</Link>

        {isLoggedIn && (
        <>
          <span>{user && user.name}</span> 
          <Link to="/products">My Info</Link>     
          <button onClick={logoutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}

    </nav>
  )
}

export default Navbar