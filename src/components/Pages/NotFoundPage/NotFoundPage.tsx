import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const NotFoundPage: React.FC = () => {
  const location = useLocation();
  console.log(location.pathname.slice(1));

  return (
    <section className={styles.notFound}>
      <div className={styles.notFound__text}>
        <h1 className={styles.notFound__number}>404</h1>
        <div className={styles.notFound__error}>There is no doc for <span className={styles.notFound__param}>{location.pathname.slice(1)}</span> </div>
        <Link className={styles.notFound__link} to={'/'}>Вернуться на гланую страницу</Link>
      </div>
    </section>
  )

}
export default NotFoundPage;