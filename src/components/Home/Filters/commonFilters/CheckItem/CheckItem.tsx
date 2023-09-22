import React, {useState, useEffect, ElementType} from 'react';
import styles from './CheckItem.module.scss';
import clsx from 'clsx';


interface CheckItemProps {
  setCount: (name: string) => number;
  name: string;
  chosenItems: string[];
  handleAddItem: (name: string) => void;
}

const CheckItem: React.FC<CheckItemProps> = ({ name, chosenItems, handleAddItem, setCount }) => {
  const [number, setNumber] = useState<number>(0);

  const count = setCount(name);

  useEffect(() => {
    if (chosenItems.length) {
      setNumber(number);
    } else {
      setNumber(count);
    }
  }, [count])


  return (
    <li className={clsx(styles.item, { [styles.item_active]: chosenItems.includes(name) })}>
      <div className={styles.item__checkbox}
        onClick={() => handleAddItem(name)}
      ></div>
      <div className={styles.item__name}><span onClick={() => handleAddItem(name)}>{name}</span></div>
      <div className={styles.item__quantity}>{number}</div>
    </li>
  );

}
export default CheckItem;