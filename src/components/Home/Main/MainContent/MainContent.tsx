import React from "react";
import styles from "./MainContent.module.scss";
import People from "./People/People";
import { peopleApi } from "../../../../store/reducers/peopleQuery";
import Preloader from "../../../common/Preloader/Preloader";

const MainContent = () => {
  const { isLoading, error } = peopleApi.useFetchPeopleQuery(100);

  if (error) {
    return <h2 className={styles.error}>Произошла ошибка...</h2>
  }

  return (
    <main className={styles.mainContent}>
      {isLoading ? (
        <div className={styles.preloader} ><Preloader /></div>
      ) : <People />
      }
    </main>
  );
}

export default MainContent;