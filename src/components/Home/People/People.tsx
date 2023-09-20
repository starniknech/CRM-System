import React, { useState, useEffect, useRef, ReactHTMLElement } from 'react'
import styles from "./People.module.scss";
import Person from './Person/Person';
import clsx from 'clsx';
import { CategoriesEnum, IPerson } from '../../../models/IPerson';
import { peopleApi } from '../../../store/reducers/peopleQuery';
import Preloader from '../../common/Preloader/Preloader';
import useAppSelector from '../../../hooks/useAppSelector';
import Tabs from '../../common/Tabs/Tabs';
import ChangeView from '../../common/ChangeView/ChangeView';
import PeopleFilters from '../Filters/PeopleFilters/PeopleFilters';
import GridElement from '../../common/GridElement/GridElement';
import { useSetView } from '../../../hooks/useSetView';

const People: React.FC = () => {
  const { filteredPeople: data } = useAppSelector(state => state.people)
  const { error, isLoading } = peopleApi.useFetchPeopleQuery(100);
  const [deletePerson, { error: deleteError, isLoading: deleteLoading }] = peopleApi.useDeletePersonMutation();
  const [toggleFavourite, { error: toggleError, isLoading: isToggleLoading }] = peopleApi.useToggleFavouritePersonMutation();
  const [activeTabButton, setActiveTabButton] = useState<string>(CategoriesEnum.STAFF);
  const [people, setPeople] = useState<IPerson[]>([]);
  const { peopleView } = useAppSelector(state => state.home);

  useSetView('peopleView');

  useEffect(() => {
    if (data) {
      const favourites = data.filter(person => person.isFavourite);   // Фильтрация по избранным(избранные сверху)
      const nonFavourites = data.filter(person => !person.isFavourite)
      const workers = favourites.concat(nonFavourites);
      setPeople(workers.filter(person => person.category === activeTabButton));
    }
  }, [data, activeTabButton])

  interface ITab {
    tabname: string;
    quantity: number | undefined;
  }
  const tabs: ITab[] = [
    { tabname: CategoriesEnum.STAFF, quantity: data.filter(person => person.category === CategoriesEnum.STAFF).length },
    { tabname: CategoriesEnum.PIECEWORK, quantity: data.filter(person => person.category === CategoriesEnum.PIECEWORK).length },
    { tabname: CategoriesEnum.CANDIDATES, quantity: data.filter(person => person.category === CategoriesEnum.CANDIDATES).length },    // Фильтрация по категориям(для табов)
    { tabname: CategoriesEnum.ARCHIVE, quantity: data.filter(person => person.category === CategoriesEnum.ARCHIVE).length },
    { tabname: CategoriesEnum.PARTNERS, quantity: data.filter(person => person.category === CategoriesEnum.PARTNERS).length },
    { tabname: CategoriesEnum.REQUESTS, quantity: data.filter(person => person.category === CategoriesEnum.REQUESTS).length },
  ]

  const handleRemovePerson = (person: IPerson) => {
    deletePerson(person);
  }

  const handleToggleFavourite = (person: IPerson) => {
    toggleFavourite(person);
  }

  return (
    <>
      {isLoading || deleteLoading || isToggleLoading ? <div className={styles.preloader} ><Preloader /></div> :
        <>
          <PeopleFilters />
          <section className={styles.peopleSection}>
            {error || deleteError || toggleError ?
              <h2 className={styles.error}>Произошла ошибка...</h2>
              : <div>
                <div className={styles.header}>
                  <Tabs activeTabButton={activeTabButton} setActiveTabButton={setActiveTabButton} tabs={tabs} />
                  <ChangeView view={peopleView} page='people' />
                </div>
                <div className={styles.body}>
                  <div className={styles.people}>
                    <ul className={clsx(styles.peopleList, { [styles.peopleGrid]: peopleView === 'grid' })}>
                      {people.map((person) => {
                        if (peopleView === 'list') {
                          return (
                            <Person key={person.id} id={person.id} person={person}
                              name={person.name} company={person.company}
                              position={person.position} isFavourite={person.isFavourite}
                              avatar={person.avatar}
                              handleRemovePerson={() => handleRemovePerson(person)} handleToggleFavourite={handleToggleFavourite}
                            />);
                        } else if (peopleView === 'grid') {
                          return (
                            <GridElement key={person.id} id={person.id}
                              name={person.name} personCompany={person.company}
                              position={person.position} isFavourite={person.isFavourite}
                              avatar={person.avatar}
                              deleteItem={() => deletePerson(person)} toggleFavourite={(favourite) => toggleFavourite({ ...person, isFavourite: favourite })}
                            />
                          );
                        }
                      })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            }
          </section>
        </>
      }
    </>

  )
}

export default People;