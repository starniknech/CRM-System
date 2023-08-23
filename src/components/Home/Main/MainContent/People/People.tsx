import React from 'react'
import styles from "./People.module.scss";
import Pearson from './Pearson/Pearson';
import { AiOutlineUnorderedList, AiFillAppstore } from "react-icons/ai";


const People = () => {
  return (
    <section className={styles.peopleSection}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button type='button' onClick={() => { }} className={styles.tabs__button}>
            <div className={styles.tabs__label}>Штатные</div> 
            <div className={styles.tabs__quantity}></div>
          </button>
          <button type='button' onClick={() => { }} className={styles.tabs__button}>
            <div className={styles.tabs__label}>Сдельные</div>
            <div className={styles.tabs__quantity}></div>
          </button>
          <button type='button' onClick={() => { }} className={styles.tabs__button}>
            <div className={styles.tabs__label}>Кандидаты</div>
            <div className={styles.tabs__quantity}></div>
          </button>
          <button type='button' onClick={() => { }} className={styles.tabs__button}>
            <div className={styles.tabs__label}>Архив</div>
            <div className={styles.tabs__quantity}></div>
          </button>
          <button type='button' onClick={() => { }} className={styles.tabs__button}>
            <div className={styles.tabs__label}>Партнеры</div>
            <div className={styles.tabs__quantity}></div>
          </button>
          <button type='button' onClick={() => { }} className={styles.tabs__button}>
            <div className={styles.tabs__label}>Запросы</div>
            <div className={styles.tabs__quantity}></div>
          </button>
        </div>
        <div className={styles.changeView}>
          <button className={styles.changeView__buttonList}><AiOutlineUnorderedList /></button>
          <button className={styles.changeView__buttonGrid}><AiFillAppstore /></button>
        </div>
      </div>
      <div className={styles.body}>
        {/* <div className={styles.filters}>
          <div className={styles.filters__name}>Имя</div>
          <div className={styles.filters__company}>Компания</div>
        </div> */}
        <div className={styles.people}>
          <ul className={styles.peopleList}>
            <Pearson
              name='Александр Соломонов'
              position='Начальник IT отдела'
              company='Global Solutions'
              isFavourite='true'
              avatar='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'
            />
          </ul>
        </div>
      </div>
    </section>
  )
}

export default People;