import { useState } from 'react';
import { Layout } from '../../components/general';
import styles from './styles.module.scss';

import { AboutUs } from '../../components/general';
import Login from '../../components/auth/Login';
import Signup from '../../components/auth/Signup';

function HomePage() {
  const [signupModal, setSignupModal] = useState(false);

  const toogleSignup = () => {
    setSignupModal(prev => !prev);
  };

  return (
    <Layout
      mainChildren={<AboutUs />}
      sideChildren={
        <div className={styles.form}>
          {!signupModal ? (
            <Login setSignupModal={toogleSignup} />
          ) : (
            <Signup setSignupModal={toogleSignup} />
          )}
        </div>
      }
    />
  );
}

export default HomePage;
