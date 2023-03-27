import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Project by{' '}
        <a href="https://www.linkedin.com/in/luciana-pg-albuquerque/" rel="noreferrer" target="_blank">
          Luciana Albuquerque
        </a>{' '}
      </p>
    </footer>
  );
}
