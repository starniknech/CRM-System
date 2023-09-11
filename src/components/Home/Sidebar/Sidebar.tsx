import React from "react";
import styles from "./Sidebar.module.scss";
import { Link, useLocation, useMatch } from "react-router-dom";
import { BsFilePersonFill, BsChatRightFill } from "react-icons/bs";
import { AiFillAppstore } from "react-icons/ai";
import { IconContext } from "react-icons/lib/esm/iconContext";
import { ISidebar } from "./ISidebar";
import clsx from "clsx";
import { PathEnum, checkUrl } from "../../../commonFunctions/checkUrl";



const Sidebar: React.FC<ISidebar> = ({ userAvatar, setSidebarOpen }) => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar} onMouseEnter={() => setSidebarOpen(true)} >
      <Link to={'/home'} className={styles.sidebar__logo} >LO
        <br />
        GO</Link>
      <nav className={styles.menu}>
        <ul className={styles.menu__list}>
          <IconContext.Provider value={{ className: 'icons', size: '32' }} >
            <li>
              <Link to={''} className={styles.menu__link}>
                <div className={styles.userAvatar}><img src={userAvatar} alt="avatar" /></div>
              </Link>
            </li>
            <li>
              <Link to={''} className={styles.menu__link}>
                <AiFillAppstore />
              </Link>
            </li>
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, { [styles.menu__link_active]: checkUrl(location.pathname) === PathEnum.PEOPLE })}>
                <BsFilePersonFill />
              </Link>
            </li>
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, { [styles.menu__link_active]: checkUrl(location.pathname) === PathEnum.COMPANIES })}>
                <span className={styles.menu__linkCircle}></span>
              </Link>
            </li>
            <li>
              <Link to={''} className={styles.menu__link}>
                <span className={styles.menu__linkCircle}></span>
              </Link>
            </li>
            <li>
              <Link to={''} className={styles.menu__link}>
                <BsChatRightFill />
              </Link>
            </li>
            <li>
              <Link to={''} className={styles.menu__link}>
                <span className={styles.menu__linkCircle}></span>
              </Link>
            </li>
            <li>
              <Link to={''} className={styles.menu__link}>
                <span className={styles.menu__linkCircle}></span>
              </Link>
            </li>
          </IconContext.Provider>
        </ul>
      </nav>
      <button className={styles.logoutLink}>
        <span className={styles.menu__linkCircle}></span>
      </button>
    </aside>
  );
}

export default Sidebar;