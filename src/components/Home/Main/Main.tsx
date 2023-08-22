import React from "react";
import styles from "./Main.module.scss";
import Filters from "./Filters/Filters";
import MainContent from "./MainContent/MainContent";

const Main = () => {
  return (
    <div className={styles.main}>
      <Filters />
      <MainContent />
    </div>
  );
}

export default Main;