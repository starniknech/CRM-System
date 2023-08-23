import React from 'react';
import styles from './Pearson.module.scss';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiBadgeCheck } from 'react-icons/bi'
import { BsChatSquareTextFill, BsFillTelephoneFill } from "react-icons/bs"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { IconContext } from 'react-icons';

interface IPearson {
  name: string;
  position: string;
  company: string;
  isFavourite: string;
  avatar: string
}

const Pearson: React.FC<IPearson> = ({ name, position, company, isFavourite, avatar }) => {
  return (
    <IconContext.Provider value={{size: '24px'}}>
      <li className={styles.pearson}>
        <div className={styles.icons}>
          <div className={styles.icons__tick}></div>
          <div className={styles.icons__favourite}>{isFavourite ? <AiFillStar /> : <AiOutlineStar />}</div>
        </div>
        <div className={styles.pearson__data}>
          <div className={styles.pearson__ava}>
            <img src={avatar} alt="" />
          </div>
          <div className={styles.pearson__info}>
            <div className={styles.pearson__name}>{name}</div>
            <div className={styles.pearson__position}>
              <BiBadgeCheck />
              <div className={styles.pearson__positionLabel}>{position}</div>
            </div>
          </div>
        </div>
        <div className={styles.company}>
          <div className={styles.company__ava}>

          </div>
          <div className={styles.company__info}>
            <div className={styles.company__name}>{company}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button type='button' className={styles.actions__button}><BsChatSquareTextFill /></button>
          <button type='button' className={styles.actions__button}><BsFillTelephoneFill /></button>
          <button type='button' className={styles.actions__button}><BiDotsHorizontalRounded /></button>
        </div>
      </li>
    </IconContext.Provider>
  )
}

export default Pearson;