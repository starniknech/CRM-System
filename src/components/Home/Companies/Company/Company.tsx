import React, { useState } from 'react';
import styles from './Company.module.scss';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { FaMapLocationDot } from "react-icons/fa6"
import { IconContext } from 'react-icons';
import { ICompany } from '../../../../models/ICompany';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';


interface CompanyProps {
  id: number;
  name: string;
  legalName: string;
  country: string;
  region: string
  direction: string;
  isFavourite: boolean;
  company: ICompany
  deleteCompany: (company: ICompany) => void;
  toggleFavourite: (company: ICompany) => void;
}

const Company: React.FC<CompanyProps> = ({ id, name, legalName, country, region, direction, isFavourite, company, deleteCompany, toggleFavourite }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const location = useLocation();

  const changeFavourite = () => {
    isFavourite ? toggleFavourite({ ...company, isFavourite: false }) : toggleFavourite({ ...company, isFavourite: true });
  }
  return (
    <li className={styles.item}>
      <IconContext.Provider value={{ size: '24px' }}>
        <button onClick={changeFavourite} className={styles.item__favourite}>
          {isFavourite ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <div className={styles.item__info}>
          <Link to={`/companies/${id}`} className={styles.item__avatar}></Link>
          <div className={styles.item__title}>
            <Link to={`/companies/${id}`} className={styles.item__name}>{name}</Link>
            <div className={styles.item__legalName}>{legalName}</div>
          </div>
        </div>
        <div className={styles.item__location}>
          <div className={styles.item__country}>{country}</div>
          <div className={styles.item__region}>{region}</div>
        </div>
        <div className={styles.item__direction}><div>{direction}</div></div>
        <div className={styles.item__actions}>
          <button className={clsx(styles.item__map, styles.disabled)}><FaMapLocationDot /></button>
          <button onClick={() => isOpenMenu ? setOpenMenu(false) : setOpenMenu(true)} className={styles.item__otherActions}><BiDotsHorizontalRounded /></button>
          {isOpenMenu && <div className={styles.item__menu}>
            <button onClick={() => deleteCompany(company)} className={styles.item__removeCompany}>Удалить</button></div>}
        </div>
      </IconContext.Provider>
    </li>
  )

}
export default Company;