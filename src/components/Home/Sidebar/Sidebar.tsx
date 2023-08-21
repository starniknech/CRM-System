import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { BsFilePersonFill, BsChatRightFill } from "react-icons/bs";
import { AiFillAppstore } from "react-icons/ai";
import { IconContext } from "react-icons/lib/esm/iconContext";


const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <NavLink to={'/home'} className={styles.sidebar__logo} >LO
        <br />
        GO</NavLink>
      <nav className={styles.menu}>
        <ul className={styles.menu__list}>
          <IconContext.Provider value={{ className: 'icons', size: '32' }} >
          <li>
            <NavLink to={''} className={styles.menu__link}>
              <span className={styles.menu__linkCircle}></span>
            </NavLink>
          </li>
          <li>
          <NavLink to={''} className={styles.menu__link}>
            <AiFillAppstore />
            </NavLink>
          </li>
          <li>
            <NavLink to={''} className={styles.menu__link}>
              <BsFilePersonFill />
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
          <li>
            <NavLink to={''} className={styles.menu__link}>
              <span className={styles.menu__linkCircle}></span>
            </NavLink>

          </li>
          <li>
            <NavLink to={''} className={styles.menu__link}>
              <BsChatRightFill size={36}/>
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
      <NavLink to={''} className={styles.logoutLink}>
        <span className={styles.menu__linkCircle}></span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;