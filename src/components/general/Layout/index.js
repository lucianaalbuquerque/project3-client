import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from './styles.module.scss';

const Layout = ({ mainChildren, sideChildren }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.mainContainer}>{mainChildren}</main>
        <section className={styles.sideContainer}>{sideChildren}</section>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
