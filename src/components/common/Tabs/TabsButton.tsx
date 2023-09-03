import React from 'react';
import styles from './Tabs.module.scss';
import clsx from "clsx";

interface TabsButtonProps {
  label: string;
  quantity: number | undefined;
  activeTabButton: string;
  setActiveTabButton: (label: string) => void;
}

const TabsButton: React.FC<TabsButtonProps> = ({label, quantity, activeTabButton, setActiveTabButton }) => {
  return (
    <button type='button' onClick={() => setActiveTabButton(label)} className={clsx(styles.tabs__button, {[styles.tabs__button_active] : (activeTabButton === label)})}>
      <div className={styles.tabs__label}>{label}</div>
      <div className={styles.tabs__quantity}>{quantity}</div>
    </button>
  )
}
export default TabsButton;