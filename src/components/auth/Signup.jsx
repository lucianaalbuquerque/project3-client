import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.scss';

function Signup({ setSignupModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleName = e => setName(e.target.value);

  const handleSignupSubmit = e => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
      .then(response => {
        navigate('/');
        setSignupModal(false);
      })
      .catch(err => setErrorMessage(err));
  };

  return (
    <div className={styles.form}>
      <h2>Signup</h2>

      <form onSubmit={handleSignupSubmit}>
        <input type="email" name="email" value={email} onChange={handleEmail} placeholder="email" />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="password"
        />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          placeholder="Brand name"
        />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Signup;
