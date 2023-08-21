import React from "react";
import styles from "./Main.module.scss";
import Filters from "./Filters/Filters";
import MainContent from "./MainContent/MainContent";

const Main = () => {
  return (
    <main className={styles.main}>
      <Filters />
      <MainContent />
    </main>
  );
}

export default Main;