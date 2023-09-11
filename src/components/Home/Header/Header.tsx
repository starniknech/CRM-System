import React from 'react';
import clsx from "clsx";
import styles from "./Header.module.scss";
import { BiSolidInfoCircle } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { IconContext } from "react-icons/lib/esm/iconContext";
import { checkUrl, PathEnum } from "../../../commonFunctions/checkUrl";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className={styles.header}>
      <h3 className={styles.header__title}>
        {checkUrl(location.pathname) === PathEnum.PEOPLE && 'ЛЮДИ'}
        {checkUrl(location.pathname) === PathEnum.COMPANIES && 'КОМПАНИИ'}
      </h3>
      <div className={styles.header__body}>
        <IconContext.Provider value={{size: '24'}}>
      <div className={styles.header__buttons}>
        <button className={clsx(styles.header__button, styles.header__button_disabled)}><IoSettingsSharp/></button>
            <button className={clsx(styles.header__button, styles.header__button_disabled)}><BiSolidInfoCircle /></button>
          </div>
        </IconContext.Provider>
      </div>
    </header>
  );
}

export default Header;