import React, { useState } from 'react';
import styles from './PersonGrid.module.scss';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiBadgeCheck } from 'react-icons/bi'
import { BsChatRightText, BsFillTelephoneFill } from "react-icons/bs"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { IconContext } from 'react-icons';
import clsx from 'clsx';
import { IPerson } from '../../../../models/IPerson';
import { Link } from 'react-router-dom';

interface PersonProps {
  id: number;
  name: string;
  position: string;
  company: string;
  isFavourite: boolean;
  avatar: string;
  person: IPerson;
  handleRemovePerson: (person: IPerson) => void;
  toggleFavouritePerson: (person: IPerson) => void;
}
const PersonGrid: React.FC<PersonProps> = ({ id, name, position, company, isFavourite, avatar, handleRemovePerson, person, toggleFavouritePerson }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const onHandleDotsClick = () => {
    if (!isOpenMenu)
      setOpenMenu(true);
    else
      setOpenMenu(false);
  }

  const handlerFavouritePerson = () => {
    isFavourite ? toggleFavouritePerson({ ...person, isFavourite: false }) : toggleFavouritePerson({ ...person, isFavourite: true });
  }

  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <li className={styles.person}>
        <div onClick={handlerFavouritePerson}
          className={styles.person__favourite}>{isFavourite ? <AiFillStar /> : <AiOutlineStar />}</div>
        <div className={styles.person__info}>
          <div className={styles.person__avatar}>
            <Link to={`/people/${id}`} >
              <img src={avatar} alt="person avatar" />
            </Link>
          </div>
          <div className={styles.person__name}><Link to={`/people/${id}`}>{name}</Link></div>
          <div className={styles.person__tagName}><Link to={`/people/${id}`}>@some_nikname</Link></div>
          <div className={styles.person__position}>
            <BiBadgeCheck />
            <div className={styles.person__positionLabel}>{position}</div>
          </div>
          <div className={styles.person__company}>{company}</div>
        </div>
        <div className={styles.person__actions}>
          <IconContext.Provider value={{ size: '16px' }}>
            <button className={clsx(styles.person__button, styles.person__button_disabled)}>
              <BsChatRightText />
              <span className={styles.person__buttonLabel} >Написать</span>
            </button>
            <button className={clsx(styles.person__button, styles.person__button_disabled)}>
              <BsFillTelephoneFill />
              <span className={styles.person__buttonLabel} >Позвонить</span>
            </button>
            <button onClick={onHandleDotsClick} className={clsx(styles.person__button, styles.person__button_dotted)} >
              <BiDotsHorizontalRounded />
            </button>
          </IconContext.Provider>
        </div>
        {isOpenMenu && (
          <div className={styles.menu}>
            <button onClick={() => handleRemovePerson(person)} className={styles.menu__button}>Удалить</button>
          </div>
        )}
      </li>
    </IconContext.Provider>
  )
}

export default PersonGrid;