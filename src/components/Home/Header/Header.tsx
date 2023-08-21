import styles from "./Header.module.scss";
import { BiSolidInfoCircle } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { IconContext } from "react-icons/lib/esm/iconContext";

const Header = () => {
  return (
    <header className={styles.header}>
      <h3 className={styles.header__title}>ЛЮДИ</h3>
      <div className={styles.header__body}>
        <IconContext.Provider value={{size: '24'}}>
      <div className={styles.header__buttons}>
        <button className={styles.header__button}><IoSettingsSharp/></button>
        <button className={styles.header__button}><BiSolidInfoCircle /></button>
          </div>
        </IconContext.Provider>
      </div>
    </header>
  );
}

export default Header;