import React, { useState } from "react";
import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";
import Header from "./Header/Header";
import useAppSelector from "../../hooks/useAppSelector";
import OpenSidebar from "./Sidebar/OpenSidebar";

const Home = () => {
  const { isSidebarOpen } = useAppSelector(state => state.home);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      {isSidebarOpen && <OpenSidebar />}
      <div className={styles.page}>
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default Home;