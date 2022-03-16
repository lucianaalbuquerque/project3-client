import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/auth.context'

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); 
 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const postLogin = async () => {
    const requestBody = {email, password};

    try { 
     let response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody )

      console.log('JWT token', response.data.authToken );
      storeToken(response.data.authToken);
      authenticateUser(); 
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleLoginSubmit =  (e) => {
    e.preventDefault();
    postLogin()
    navigate('/profile')
  };
  
  return (
    <div>
      <h1>Login</h1>
 
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail}/>
 
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword}/>
 
        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default Login