import React, { useState } from 'react';
import styles from './ItemInfo.module.scss';
import { BsChatRightText, BsFillTelephoneFill } from 'react-icons/bs';
import clsx from 'clsx';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';


interface ItemInfoProps {
  name: undefined | string;
  isFavourite: undefined | boolean;
  avatar?: string;
  changeFavourite: () => void;
  buttons: string[];
  activeButton: string;
  setActiveButton: (button: string) => void;
  handleDeleteItem: () => void;
}
const ItemInfo: React.FC<ItemInfoProps> = ({ name, avatar, isFavourite, changeFavourite, activeButton, setActiveButton, buttons, handleDeleteItem }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    isOpenMenu ? setOpenMenu(false) : setOpenMenu(true);
  }
  const clikDeleteHandler = () => {
    handleDeleteItem();
    avatar ? navigate('/people', { replace: true }) : navigate('/companies', { replace: true });
  }

  return (
    <>
      <div className={styles.item}>
        <div className={styles.item__info}>
          <div className={styles.item__avatar}>
            {avatar
              ? <div className={styles.item__realAvatar}><img src={avatar} alt="ava" /></div>
              : <div className={styles.item__mockAvatar}></div>
            }
          </div>
          <div className={styles.item__nameInfo}>
            <div className={styles.item__name}>{name}</div>
            <div className={styles.item__nikname}>@some_nikname</div>
          </div>
        </div>
        <div className={styles.item__actions}>
          <button className={clsx(styles.item__button, styles.disabled)}>
            <BsChatRightText />
            <div className={styles.item__buttonLabel}>Написать</div>
          </button>
          <button className={clsx(styles.item__button, styles.disabled)}>
            <BsFillTelephoneFill />
            <div className={styles.item__buttonLabel}>Позвонить</div>
          </button>
          <button onClick={changeFavourite} className={clsx(styles.item__smallButton, { [styles.item__smallButton_active]: isFavourite })}>
            {isFavourite ?
              <AiFillStar />
              : <AiOutlineStar />
            }
          </button>
          <button onClick={handleClick} className={clsx(styles.item__smallButton, { [styles.item__smallButton_active]: isOpenMenu })}><BiDotsHorizontalRounded /></button>
          {isOpenMenu &&
            <div className={styles.item__additionalActions}>
              <button onClick={clikDeleteHandler} className={styles.item__additionalActionsButton}>Удалить</button>
            </div>
          }
        </div>
      </div>
      <div className={styles.tabs}>
        {buttons.map(el =>
          <button onClick={() => setActiveButton(el)} key={el} className={clsx(styles.tabs__button, { [styles.tabs__button_active]: activeButton === el })}>{el}</button>
        )}
      </div>
    </>

  )

}
export default ItemInfo;