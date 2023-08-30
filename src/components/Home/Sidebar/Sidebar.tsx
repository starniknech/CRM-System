import React, { useMemo, useState } from "react";
import styles from "./Sidebar.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { BsFilePersonFill, BsChatRightFill } from "react-icons/bs";
import { AiFillAppstore } from "react-icons/ai";
import { IconContext } from "react-icons/lib/esm/iconContext";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { setSidebarOpen } from "../../../store/reducers/home";
import { ISidebar } from "./ISidebar";
import clsx from "clsx";
import { PathEnum, checkUrl } from "../../../commonFunctions/checkUrl";



const Sidebar: React.FC<ISidebar> = ({ userAvatar }) => {
  const location = useLocation();


  const dispatch = useAppDispatch();
  const onMouseEnter = () => {
    dispatch(setSidebarOpen(true))
  }



  return (
    <aside className={styles.sidebar} onMouseEnter={() => onMouseEnter()} >
      <NavLink to={'/home'} className={styles.sidebar__logo} >LO
        <br />
        GO</NavLink>
      <nav className={styles.menu}>
        <ul className={styles.menu__list}>
          <IconContext.Provider value={{ className: 'icons', size: '32' }} >
            <li>
              <NavLink to={''} className={styles.menu__link}>
                <div className={styles.userAvatar}><img src={userAvatar} alt="avatar" /></div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={styles.menu__link}>
                <AiFillAppstore />
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink, { [styles.menu__link_active]: checkUrl(location.pathname) === PathEnum.PEOPLE })}>
                <BsFilePersonFill />
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink, { [styles.menu__link_active]: checkUrl(location.pathname) === PathEnum.COMPANIES })}>
                <span className={styles.menu__linkCircle}></span>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={styles.menu__link}>
                <span className={styles.menu__linkCircle}></span>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={styles.menu__link}>
                <BsChatRightFill />
              </NavLink>
            </li>
            <li>

              <NavLink to={''} className={styles.menu__link}>
                <span className={styles.menu__linkCircle}></span>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={styles.menu__link}>
                <span className={styles.menu__linkCircle}></span>
              </NavLink>
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