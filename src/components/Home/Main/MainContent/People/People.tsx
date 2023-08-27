import React, { useState, useEffect } from 'react'
import styles from "./People.module.scss";
import { AiOutlineUnorderedList, AiFillAppstore } from "react-icons/ai";
import { IPerson } from '../../../../../models/IPerson';
import { peopleApi } from '../../../../../store/reducers/peopleQuery';
import PeopleTabsButton from './PeopleTabsButton';
import Person from './Person/Person';


const People = () => {
  const { data, refetch } = peopleApi.useFetchPeopleQuery(100);
  const [deletePerson, { }] = peopleApi.useDeletePersonMutation(); // 1 elem это функция, которая удаляет человека, а 2 - объект с isLoading, error и тп
  const [addToFavourite, { }] = peopleApi.useAddToFavouritePersonMutation();
  const [removeFromFavourite, { }] = peopleApi.useRemoveFromFavouritePersonMutation();
  const [activeTabButton, setActiveTabButton] = useState<string>('Штатные');
  const [people, setPeople] = useState<IPerson[]>([]);

  useEffect(() => {
    if (data) {
      const favourites = data.filter(person => person.isFavourite === 'true');
      const nonFavourites = data.filter(person => person.isFavourite === 'false')
      const workers = [
        ...favourites,
        ...nonFavourites,
      ]
      setPeople(workers.filter(person => person.category === activeTabButton));
    }
  }, [data, activeTabButton])

  interface ITab {
    tabname: string;
    quantity: number | undefined;
  }
  const tabs: ITab[] = [
    { tabname: 'Штатные', quantity: data?.filter(person => person.category === 'Штатные').length },
    { tabname: 'Сдельные', quantity: data?.filter(person => person.category === 'Сдельные').length },
    { tabname: 'Кандидаты', quantity: data?.filter(person => person.category === 'Кандидаты').length },
    { tabname: 'Архив', quantity: data?.filter(person => person.category === 'Архив').length },
    { tabname: 'Партнеры', quantity: data?.filter(person => person.category === 'Партнеры').length },
    { tabname: 'Запросы', quantity: data?.filter(person => person.category === 'Запросы').length },
  ]

  const handleRemovePerson = (person: IPerson) => {
    deletePerson(person);
  }

  const addToFavouritePerson = (person: IPerson) => {
    addToFavourite(person);
  }

  const removeFavouritePerson = (person: IPerson) => {
    removeFromFavourite(person);
  }

  return (
    <section className={styles.peopleSection}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          {tabs.map((tab) => <PeopleTabsButton activeTabButton={activeTabButton}
            setActiveTabButton={(label) => setActiveTabButton(label)}
            key={tab.tabname} label={tab.tabname} quantity={tab.quantity} />)}
        </div>
        <div className={styles.changeView}>
          <button className={styles.changeView__buttonList}><AiOutlineUnorderedList /></button>
          <button className={styles.changeView__buttonGrid}><AiFillAppstore /></button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.people}>
          <ul className={styles.peopleList}>
            {people.map((person) =>
              <Person key={person.id} person={person}
                name={person.name} company={person.company}
                position={person.position} isFavourite={person.isFavourite}
                avatar={person.avatar}
                handleRemovePerson={handleRemovePerson} addToFavouritePerson={addToFavouritePerson} removeFromFavouritePerson={removeFavouritePerson}
              />)
            }
          </ul>
        </div>
      </div>

    </section>
  )
}

export default People;