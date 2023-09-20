import React from 'react';
import styles from './SpoilerButton.module.scss';
import clsx from 'clsx';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface SpoilerButtonProps {
  label: string;
  index: number;
  isOpenSpoiler: boolean;
  handleOpenSpoiler: (index: number) => void
}

const SpoilerButton: React.FC<SpoilerButtonProps> = ({ index, label, isOpenSpoiler, handleOpenSpoiler }) => {

  return (
    <button
      onClick={() => handleOpenSpoiler(index)}
      className={clsx(styles.button, { [styles.button_active]: isOpenSpoiler })}>
      <div className={styles.button__label}>{label}</div>
      <div className={clsx(styles.button__arrow, { [styles.button__arrow_active]: isOpenSpoiler })}><MdKeyboardArrowDown /></div>
    </button>
  )

}
export default SpoilerButton;