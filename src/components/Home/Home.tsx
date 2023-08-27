import React, { useState, useMemo } from "react";
import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";
import Header from "./Header/Header";
import useAppSelector from "../../hooks/useAppSelector";
import OpenSidebar from "./Sidebar/OpenSidebar";

const Home = () => {
  const { isSidebarOpen } = useAppSelector(state => state.home);
  const [userAvatar, setUserAvatar] = useState<string>();


  const user = window.localStorage.getItem('user')
  useMemo(() => {
    if (user) {
      const userAvatar = JSON.parse(user).image;
      setUserAvatar(userAvatar);
    }
  }, [user])
  
  return (
    <div className={styles.wrapper}>
      <Sidebar userAvatar={userAvatar} />
      {isSidebarOpen && <OpenSidebar userAvatar={userAvatar} />}
      <div className={styles.page}>
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default Home;