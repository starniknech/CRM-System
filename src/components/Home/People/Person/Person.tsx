import React, { useState } from 'react';
import styles from './Person.module.scss';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiBadgeCheck } from 'react-icons/bi'
import { BsChatSquareTextFill, BsFillTelephoneFill } from "react-icons/bs"
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
  handleToggleFavourite: (person: IPerson) => void;
}
const Person: React.FC<PersonProps> = ({ id, name, position, company, isFavourite, avatar, handleRemovePerson, person, handleToggleFavourite }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const onHandleDotsClick = () => {
    if (!isOpenMenu)
      setOpenMenu(true);
    else
      setOpenMenu(false);
  }

  const handlerFavouritePerson = () => {
    isFavourite ? handleToggleFavourite({ ...person, isFavourite: false }) : handleToggleFavourite({ ...person, isFavourite: true });
  }

  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <li className={styles.pearson}>
        <div className={styles.icons}>
          <div onClick={() => handlerFavouritePerson()}
            className={styles.icons__favourite}>{(isFavourite) ? <AiFillStar /> : <AiOutlineStar />}</div>
        </div>
        <div className={styles.pearson__data}>
          <div className={styles.pearson__ava}>
            <Link to={`/people/${id}`}><img src={avatar} alt="" /></Link>
          </div>
          <div className={styles.pearson__info}>
            <div className={styles.pearson__name}><Link to={`/people/${id}`} >{name}</Link></div>
            <div className={styles.pearson__position}>
              <BiBadgeCheck />
              <div className={styles.pearson__positionLabel}>{position}</div>
            </div>
          </div>
        </div>
        <div className={styles.company}>
          <div className={styles.company__ava}></div>
          <div className={styles.company__info}>
            <div className={styles.company__name}>{company}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button type='button' className={clsx(styles.actions__button, styles.actions__disabledButton)}><BsFillTelephoneFill /></button>
          <button type='button' className={clsx(styles.actions__button, styles.actions__disabledButton)}><BsChatSquareTextFill /></button>
          <button type='button' onClick={() => onHandleDotsClick()} className={styles.actions__button}><BiDotsHorizontalRounded /></button>
          {isOpenMenu && (
            <div className={styles.menu}>
              <button onClick={() => handleRemovePerson(person)} className={styles.menu__button}>Удалить</button>
            </div>
          )}
        </div>
      </li>
    </IconContext.Provider>
  )
}

export default Person;