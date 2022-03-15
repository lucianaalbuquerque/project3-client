import { useContext } from "react";                     
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);

  return (
    <nav>
        {isLoggedIn && (
        <>
          <Link to="/profile">Home</Link>
          <Link to="/profile/edit">{user && user.name}</Link>    {/*  ESSA ROTA NAO EXISTE NEM A PAGE */}
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