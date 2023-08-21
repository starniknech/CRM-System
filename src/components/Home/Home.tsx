import React from "react";
import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";
import Header from "./Header/Header";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.page}>
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default Home;