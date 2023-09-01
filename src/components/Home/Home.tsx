import React, { useState, useMemo } from "react";
import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import useAppSelector from "../../hooks/useAppSelector";
import OpenSidebar from "./Sidebar/OpenSidebar";
import PeopleFilters from "./Filters/PeopleFilters/PeopleFilters";
import { Outlet, useLocation } from "react-router-dom";
import { PathEnum, checkUrl } from "../../commonFunctions/checkUrl";
import CompaniesFilter from "./Filters/CompaniesFilters/CompaniesFilter";

const Home = () => {
  const { isSidebarOpen } = useAppSelector(state => state.home);
  const { user } = useAppSelector(state => state.login)
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <Sidebar userAvatar={user.avatar} />
      {isSidebarOpen && <OpenSidebar userAvatar={user.avatar} />}
      <div className={styles.page}>
        <Header />
        <div className={styles.main}>
          {checkUrl(location.pathname) === PathEnum.PEOPLE && <PeopleFilters />}
          {checkUrl(location.pathname) === PathEnum.COMPANIES && <CompaniesFilter />}
          <main className={styles.mainContent}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;