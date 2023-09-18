import React, { useState } from 'react';
import styles from './GridElement.module.scss';
import { IconContext } from 'react-icons';
import { BiBadgeCheck, BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsChatRightText, BsFillTelephoneFill } from 'react-icons/bs';
import clsx from 'clsx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface GridElementProps {
  id: number
  name: string;
  isFavourite: boolean;
  country?: string;
  region?: string;
  avatar?: string;
  direction?: string;
  position?: string;
  personCompany?: string;
  deleteItem: () => void;
  toggleFavourite: (favourite: boolean) => void;
}

const GridElement: React.FC<GridElementProps> = ({ id, name, avatar, isFavourite, toggleFavourite, personCompany, position, country, region, direction, deleteItem }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const onHandleDotsClick = () => {
    if (!isOpenMenu)
      setOpenMenu(true);
    else
      setOpenMenu(false);
  }

  const changeFavourite = () => {
    isFavourite ? toggleFavourite(false) : toggleFavourite(true);
  }

  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <li className={styles.item}>
        <div onClick={changeFavourite}
          className={styles.item__favourite}>{isFavourite ? <AiFillStar /> : <AiOutlineStar />}</div>
        <div className={styles.item__info}>
          {avatar ?
            <div className={styles.item__personAvatar}>
              <Link to={`/people/${id}`} >
                <img src={avatar} alt="person avatar" />
              </Link>
            </div>
            : <Link to={`/companies/${id}`} ><div className={styles.item__avatar}></div></Link>
          }
          <div className={styles.item__name}><Link to={`/${region ? 'companies' : 'people'}/${id}`} >{name}</Link></div>
          <div className={styles.item__tagName}><Link to={`/${region ? 'companies' : 'people'}/${id}`} >@some_nikname</Link></div>
          {region ?
            <div className={styles.item__location}>
              <div className={styles.item__country}>{country}</div>
              <div className={styles.item__region}>{region}</div>
              <div className={styles.item__direction}>{direction}</div>
            </div>
            : <div className={styles.item__personInfo}>
              <div className={styles.item__position}>
                <BiBadgeCheck />
                <div className={styles.item__positionLabel}>{position}</div>
              </div>
              <div className={styles.item__company}>{personCompany}</div>
            </div>
          }
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
            <button onClick={() => deleteItem()} className={styles.menu__button}>Удалить</button>
          </div>
        )}
      </li>
    </IconContext.Provider>
  )

}
export default GridElement;