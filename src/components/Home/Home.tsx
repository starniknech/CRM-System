import React, { useState, useMemo } from "react";
import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import useAppSelector from "../../hooks/useAppSelector";
import OpenSidebar from "./Sidebar/OpenSidebar";
import Filters from "./Filters/Filters";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { isSidebarOpen } = useAppSelector(state => state.home);
  const {user} = useAppSelector(state => state.login)

  return (
    <div className={styles.wrapper}>
      <Sidebar userAvatar={user.avatar} />
      {isSidebarOpen && <OpenSidebar userAvatar={user.avatar} />}
      <div className={styles.page}>
        <Header />
        <div className={styles.main}>
          <Filters />
          <main className={styles.mainContent}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;