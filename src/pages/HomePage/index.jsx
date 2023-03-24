import { useState } from 'react';
import { Layout } from '../../components/general';
import styles from './styles.module.scss';

import About from '../../components/auth/About';
import Login from '../../components/auth/Login';
import Signup from '../../components/auth/Signup';

function HomePage() {
  const [signupModal, setSignupModal] = useState(false);

  const toogleSignup = () => {
    setSignupModal(prev => !prev);
  };

  return (
    <Layout
      mainChildren={<About />}
      sideChildren={
        <div className={styles.form}>
          {!signupModal ? (
            <>
              <Login />
              <p>Don't have an account yet?</p>
              <span onClick={toogleSignup}> Sign Up</span>
            </>
          ) : (
            <>
              <Signup setSignupModal={setSignupModal} />
              <p>Already have account?</p>
              <span onClick={toogleSignup}> Login</span>
            </>
          )}
        </div>
      }
    />
  );
}

export default HomePage;
