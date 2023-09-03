import React, { useState } from 'react';
import styles from './Company.module.scss';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { FaMapLocationDot } from "react-icons/fa6"
import { IconContext } from 'react-icons';
import { ICompany } from '../../../../models/ICompany';
import clsx from 'clsx';


interface CompanyProps {
  name: string;
  legalName: string;
  country: string;
  region: string
  direction: string;
  isFavourite: boolean;
  company: ICompany
  deleteCompany: (company: ICompany) => void;
  addToFavourite: (company: ICompany) => void;
  removeFromFavourite: (company: ICompany) => void;
}

const Company: React.FC<CompanyProps> = ({ name, legalName, country, region, direction, isFavourite, company, deleteCompany, addToFavourite, removeFromFavourite }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const changeFavourite = () => {
    isFavourite ? removeFromFavourite({...company, isFavourite: false}) : addToFavourite({...company, isFavourite: true});
  }



  return (
    <li className={styles.item}>
      <IconContext.Provider value={{ size: '24px' }}>
        <button onClick={changeFavourite} className={styles.item__favourite}>
          {isFavourite ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <div className={styles.item__info}>
          <div className={styles.item__avatar}></div>
          <div className={styles.item__title}>
            <h3 className={styles.item__name}>{name}</h3>
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