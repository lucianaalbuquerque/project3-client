import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import styles from './styles.module.scss';

function Login({ setSignupModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const postLogin = async () => {
    const requestBody = { email, password };

    try {
      let response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody);

      console.log('JWT token', response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    postLogin();
    navigate('/profile');
  };

  return (
    <div className={styles.form}>
      <div className={styles.bigTab}>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <input type="password" name="password" value={password} onChange={handlePassword} />
        <div className={styles.smallTab}>
          <button type="submit">Login</button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className={styles.smallTab}>
        <p>Don't have an account yet? </p>
        <span onClick={setSignupModal}>Sign Up</span>
      </div>
    </div>
  );
}

export default Login;
