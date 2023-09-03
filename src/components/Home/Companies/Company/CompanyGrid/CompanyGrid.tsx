import React, { useState } from 'react';
import styles from './CompanyGrid.module.scss';
import { IconContext } from 'react-icons';
import { ICompany } from '../../../../../models/ICompany';
import { BiBadgeCheck, BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsChatRightText, BsFillTelephoneFill } from 'react-icons/bs';
import clsx from 'clsx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface PersonProps {
  name: string;
  isFavourite: boolean;
  object: ICompany;
  country: string;
  region: string;
  direction: string;
  deleteCompany: (person: ICompany) => void;
  addToFavourite: (person: ICompany) => void;
  removeFromFavourite: (person: ICompany) => void;
}

const CompanyGrid: React.FC<PersonProps> = ({name, isFavourite, object, addToFavourite, removeFromFavourite, country, region, direction, deleteCompany }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const onHandleDotsClick = () => {
    if (!isOpenMenu)
      setOpenMenu(true);
    else
      setOpenMenu(false);
  }

  const changeFavourite = () => {
    if (isFavourite) {
      removeFromFavourite({ ...object, isFavourite: false });
    } else
      addToFavourite({ ...object, isFavourite: true });
  }

  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <li className={styles.item}>
        <div onClick={changeFavourite}
          className={styles.item__favourite}>{isFavourite ? <AiFillStar /> : <AiOutlineStar />}</div>
        <div className={styles.item__info}>
          <div className={styles.item__avatar}>
          </div>
          <div className={styles.item__name}>{name}</div>
          <div className={styles.item__tagName}>@some_nikname</div>
          <div className={styles.item__country}>{country}</div>
          <div className={styles.item__region}>{region}</div>
          <div className={styles.item__direction}>{direction}</div>
        </div>
        <div className={styles.item__actions}>
          <IconContext.Provider value={{ size: '16px' }}>
            <button className={clsx(styles.item__button, styles.item__button_disabled)}>
              <BsChatRightText />
              <span className={styles.item__buttonLabel} >Написать</span>
            </button>
            <button className={clsx(styles.item__button, styles.item__button_disabled)}>
              <BsFillTelephoneFill />
              <span className={styles.item__buttonLabel} >Позвонить</span>
            </button>
            <button onClick={onHandleDotsClick} className={clsx(styles.item__button, styles.item__button_dotted)} >
              <BiDotsHorizontalRounded />
            </button>
          </IconContext.Provider>
        </div>
        {isOpenMenu && (
          <div className={styles.menu}>
            <button onClick={() => deleteCompany(object)} className={styles.menu__button}>Удалить</button>
          </div>
        )}
      </li>
    </IconContext.Provider>
  )

}
export default CompanyGrid;