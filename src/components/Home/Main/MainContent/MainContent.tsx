import React from "react";
import styles from "./MainContent.module.scss";
import People from "./People/People";

const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <People />
    </main>
  );
}

export default MainContent;