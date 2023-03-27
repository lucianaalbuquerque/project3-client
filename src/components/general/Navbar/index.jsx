import { useContext } from 'react';
import { AuthContext } from '../../../context/auth.context';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Navbar() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);

  return (
    <navbar className={styles.navbar}>
      <div className={styles.navItem1}>
        {isLoggedIn && user ? <Link to="/profile">Home</Link> : <p>Tutorial</p>}
      </div>
      <div className={styles.navItem2}>
        {isLoggedIn ? (
          <>
            <Link to="/profile/edit">{user.name}</Link>
            <a href={'/'} onClick={logoutUser}>
              x
            </a>
          </>
        ) : null}
      </div>
    </navbar>
  );
}
