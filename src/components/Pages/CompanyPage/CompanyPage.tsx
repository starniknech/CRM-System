import React, { useState, useEffect } from 'react';
import styles from './CompanyPage.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import ItemInfo from '../common/ItemInfo/ItemInfo';
import { companyAPI } from '../../../store/reducers/companyQuery';
import { IconContext } from 'react-icons';
import clsx from 'clsx';
import Preloader from '../../common/Preloader/Preloader';



const CompanyPage: React.FC = () => {
  const { id } = useParams();
  const { data: company, isLoading, error } = companyAPI.useGetCompanyByIdQuery(id);
  const [deleteCompany, { error: deleteError, isLoading: isDeleteLoading }] = companyAPI.useDeleteCompanyMutation();
  const [toggleFavourite, { isLoading: isToggleLoading, error: toggleError }] = companyAPI.useToggleFavouriteCompaniesMutation();
  const [activeButton, setActiveButton] = useState<string>('Общий');
  const navigate = useNavigate();

  const changeFavourite = () => {
    if (company) {
      company.isFavourite ? toggleFavourite({ ...company, isFavourite: false }) : toggleFavourite({ ...company, isFavourite: true });
    }
  }

  const handleDeleteCompany = () => {
    if (company) {
      deleteCompany(company);
    }
  }

  const handleNavigate = () => {
    navigate('/companies');
  }

  const buttons = ['Общий', 'Услуги', 'Документы', 'Сотрудники']

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
                      <li onClick={handleNavigate} className={styles.navigation__item}><IoIosArrowForward />Компании</li>
                      <li className={clsx(styles.navigation__item, styles.navigation__item_company)}><IoIosArrowForward />{company?.name}</li>
                    </ul>
                  </nav>
                  <button className={styles.page__search}><AiOutlineSearch /></button>
                </div>
                <div className={styles.page__body}>
                  {company &&
                    <ItemInfo handleDeleteItem={handleDeleteCompany} setActiveButton={setActiveButton} activeButton={activeButton} buttons={buttons} changeFavourite={changeFavourite} name={company.name} isFavourite={company.isFavourite} />
                  }
                </div>
              </section>
            }
          </>
      }
    </IconContext.Provider>
  );
}
export default CompanyPage;