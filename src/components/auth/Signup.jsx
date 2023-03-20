import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';

function Signup({ setSignupModal }) {
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

        axios.post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
        .then((response) => {
        navigate('/');
        setSignupModal(false);
      })
      .catch((err) => setErrorMessage(err))
    }

  return (
    <div>
        <h2>Signup</h2>
        
        <form onSubmit={handleSignupSubmit}> 
            <TextField size="small"  type="email" name="email" value={email} onChange={handleEmail} placeholder="email" />
            <TextField size="small"  type="password" name="password" value={password} onChange={handlePassword} placeholder="password" />
            <TextField size="small"  type="text" name="name" value={name} onChange={handleName} placeholder="Brand name" />
            <button type="submit">Sign Up</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

    </div>
  )
}

export default Signup