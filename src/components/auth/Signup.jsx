import { useState } from "react";
import { /* Link, */ Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleName = (e) => setName(e.target.value)

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password, name };

        axios.post(`${API_URL}/api/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
    }

  return (
    <div>
        <h3>Signup</h3>
        
        <form onSubmit={handleSignupSubmit}> 
            <input type="email" name="email" value={email} onChange={handleEmail} placeholder="email" />
            <input type="password" name="password" value={password} onChange={handlePassword} placeholder="password" />
            <input type="text" name="name" value={name} onChange={handleName} placeholder="Brand name" />
            <button type="submit">Sign Up</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }
        <p>Already have account?</p>
        <Navigate to={"/login"}> Login</Navigate>

    </div>
  )
}

export default Signup