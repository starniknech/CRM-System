import React, { useState } from "react";
import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import useAppSelector from "../../hooks/useAppSelector";
import OpenSidebar from "./Sidebar/OpenSidebar";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAppSelector(state => state.login)

  return (
    <div className={styles.wrapper}>
      {isSidebarOpen
        ? <OpenSidebar setSidebarOpen={setSidebarOpen} userAvatar={user.avatar} />
        : <Sidebar userAvatar={user.avatar} setSidebarOpen={setSidebarOpen} />}
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Home;