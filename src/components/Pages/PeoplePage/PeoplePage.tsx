import React, { useState } from 'react';
import styles from './PeoplePage.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import ItemInfo from '../common/ItemInfo/ItemInfo';
import { IconContext } from 'react-icons';
import clsx from 'clsx';
import Preloader from '../../common/Preloader/Preloader';
import { peopleApi } from '../../../store/reducers/peopleQuery';



const PeoplePage: React.FC = () => {
  const { id } = useParams();
  const { data: person, isLoading, error } = peopleApi.useGetPersonByIdQuery(id);
  const [deletePerson, { error: deleteError, isLoading: isDeleteLoading }] = peopleApi.useDeletePersonMutation();
  const [toggleFavourite, { isLoading: isToggleLoading, error: toggleError }] = peopleApi.useToggleFavouritePersonMutation();
  const [activeButton, setActiveButton] = useState<string>('Общий');
  const navigate = useNavigate();

  const changeFavourite = () => {
    if (person) {
      person.isFavourite ? toggleFavourite({ ...person, isFavourite: false }) : toggleFavourite({ ...person, isFavourite: true });
    }
  }

  const handleDeleteCompany = () => {
    if (person) {
      deletePerson(person);
    }
  }

  const handleNavigate = () => {
    navigate('/people');
  }

  const buttons = ['Общий', 'Проекты и задачи', 'Документы', 'Резюме', 'Заявки и жалобы'];

  return (
    <IconContext.Provider value={{ size: '16px' }}>
      {
        isLoading || isToggleLoading || isDeleteLoading ?
          <div className={styles.preloader}><Preloader /></div>
          : <>
            {error || toggleError || deleteError ? <div className={styles.error}>Произошла ошибка...</div>
              :
              <section className={styles.page}>
                <div className={styles.page__header}>
                  <nav className={styles.navigation}>
                    <ul className={styles.navigation__list}>
                      <li onClick={handleNavigate} className={styles.navigation__item}>Главная</li>
                      <li onClick={handleNavigate} className={styles.navigation__item}><IoIosArrowForward />Люди</li>
                      <li className={clsx(styles.navigation__item, styles.navigation__item_person)}><IoIosArrowForward />{person?.name}</li>
                    </ul>
                  </nav>
                  <button className={styles.page__search}><AiOutlineSearch /></button>
                </div>
                <div className={styles.page__body}>
                  {person &&
                    <ItemInfo avatar={person.avatar} handleDeleteItem={handleDeleteCompany} setActiveButton={setActiveButton} activeButton={activeButton} buttons={buttons} changeFavourite={changeFavourite} name={person.name} isFavourite={person.isFavourite} />
                  }
                </div>
              </section>
            }
          </>
      }
    </IconContext.Provider>
  );
}
export default PeoplePage;