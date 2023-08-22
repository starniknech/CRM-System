import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFilePersonFill, BsChatRightFill } from "react-icons/bs";
import { AiFillAppstore } from "react-icons/ai";
import { IconContext } from "react-icons/lib/esm/iconContext";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { setSidebarOpen } from "../../../store/reducers/home";
import clsx from "clsx";


const OpenSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onMouseOut = () => {
    dispatch(setSidebarOpen(false));
  }
  const logout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }

  return (

    <aside className={clsx(styles.sidebar, styles.openSidebar)} onMouseLeave={() => onMouseOut()} >
      <div className={styles.sidebar__companyLogo} >
      <NavLink to={'/home'} className={styles.sidebar__logo} >LO
        <br />
          GO</NavLink>
        <h2 className={styles.sidebar__companyName} >Company Name</h2>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menu__list}>
          <IconContext.Provider value={{ className: 'icons', size: '32' }} >
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Поиск</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <AiFillAppstore />
                <div className={styles.menu__linkLabel}>Проекты</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <BsFilePersonFill />
                <div className={styles.menu__linkLabel}>Люди</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Компании</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Товары и Услуги</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <BsChatRightFill />
                <div className={styles.menu__linkLabel}>Чат</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Закладки</div>
              </NavLink>
            </li>
            <li>
              <NavLink to={''} className={clsx(styles.menu__link, styles.openSidebarLink)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Уведомления</div>
              </NavLink>
            </li>
          </IconContext.Provider>
        </ul>
      </nav>
      <button onClick={() => logout()} type="button" className={clsx(styles.logoutLink, styles.openSidebarLink)} >
        <span className={styles.menu__linkCircle}></span>
        <div className={styles.menu__linkLabel}>Выйти</div>
      </button>
    </aside>
  );
}

export default OpenSidebar;