import React from "react";
import styles from "./Sidebar.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFilePersonFill, BsChatRightFill } from "react-icons/bs";
import { AiFillAppstore } from "react-icons/ai";
import { IconContext } from "react-icons/lib/esm/iconContext";
import useAppDispatch from "../../../hooks/useAppDispatch";
import clsx from "clsx";
import { ISidebar } from "./ISidebar";
import { setSignOut } from "../../../store/reducers/login";
import { PathEnum, checkUrl } from "../../../commonFunctions/checkUrl";


const OpenSidebar: React.FC<ISidebar> = ({ userAvatar, setSidebarOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const logout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('isLoggedIn');
    navigate('/login', { replace: true });
    dispatch(setSignOut());
  }

  return (

    <aside className={clsx(styles.sidebar, styles.openSidebar)} onMouseLeave={() => setSidebarOpen(false)} >
      <div className={styles.sidebar__companyLogo} >
        <Link to={'/home'} className={styles.sidebar__logo} >LO
          <br />
          GO</Link>
        <h2 className={styles.sidebar__companyName} >Company Name</h2>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menu__list}>
          <IconContext.Provider value={{ className: 'icons', size: '32' }} >
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, styles.disabled)}>
                <div className={styles.userAvatar}>
                  <img src={userAvatar} alt="avatar" />
                </div>
                <div className={styles.menu__linkLabel}>Поиск</div>
              </Link>
            </li>
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, styles.disabled)}>
                <AiFillAppstore />
                <div className={styles.menu__linkLabel}>Проекты</div>
              </Link>
            </li>
            <li>
              <Link to={'/'}
                className={clsx(styles.menu__link, styles.openSidebarLink, { [styles.menu__link_active]: checkUrl(location.pathname) === PathEnum.PEOPLE })}>
                <BsFilePersonFill />
                <div className={styles.menu__linkLabel}>Люди</div>
              </Link>
            </li>
            <li>
              <Link to={'/companies'}
                className={clsx(styles.menu__link, styles.openSidebarLink, { [styles.menu__link_active]: checkUrl(location.pathname) === PathEnum.COMPANIES })}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Компании</div>
              </Link>
            </li>
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, styles.disabled)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Товары и Услуги</div>
              </Link>
            </li>
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, styles.disabled)}>
                <BsChatRightFill />
                <div className={styles.menu__linkLabel}>Чат</div>
              </Link>
            </li>
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, styles.disabled)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Закладки</div>
              </Link>
            </li>
            <li>
              <Link to={''} className={clsx(styles.menu__link, styles.openSidebarLink, styles.disabled)}>
                <span className={styles.menu__linkCircle}></span>
                <div className={styles.menu__linkLabel}>Уведомления</div>
              </Link>
            </li>
          </IconContext.Provider>
        </ul>
      </nav>
      <button onClick={logout} type="button" className={clsx(styles.logoutLink, styles.openSidebarLink)} >
        <span className={styles.menu__linkCircle}></span>
        <div className={styles.menu__linkLabel}>Выйти</div>
      </button>
    </aside>
  );
}

export default OpenSidebar;