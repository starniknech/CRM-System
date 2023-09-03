import React from 'react';
import styles from './Tabs.module.scss';
import { ITab } from './ITab';
import TabsButton from './TabsButton';

interface TabsProps {
  tabs: ITab[];
  activeTabButton: string;
  setActiveTabButton: (label: string) => void
}


const Tabs: React.FC<TabsProps> = ({ tabs, activeTabButton, setActiveTabButton }) => {


  return (
    <nav className={styles.tabs}>
      <ul className={styles.tabs__list}>
        {tabs.map((tab) => <TabsButton activeTabButton={activeTabButton}
          setActiveTabButton={(label) => setActiveTabButton(label)}
          key={tab.tabname} label={tab.tabname} quantity={tab.quantity} />)}
      </ul>
    </nav>
  )

}
export default Tabs;