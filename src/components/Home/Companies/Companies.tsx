import React, { useState, useEffect, useMemo } from 'react';
import styles from './Companies.module.scss';
import { companyAPI } from '../../../store/reducers/companyQuery';
import { CategoriesEnum, ICompany } from '../../../models/ICompany';
import Tabs from '../../common/Tabs/Tabs';
import ChangeView from '../../common/ChangeView/ChangeView';
import { useSearchParams } from 'react-router-dom';
import Company from './Company/Company';
import CompanyGrid from './Company/CompanyGrid/CompanyGrid';
import clsx from 'clsx';


const Companies = () => {
  const { data, isLoading, error } = companyAPI.useFetchCompaniesQuery(100);
  const [deleteCompany, { error: deleteError, isLoading: isDeleteLoading }] = companyAPI.useDeleteCompanyMutation();
  const [addToFavourite, { error: addError, isLoading: isAddLoading }] = companyAPI.useAddToFavouritesCompaniesMutation();
  const [removeFromFavourite, { error: removeError, isLoading: isRemoveLoading }] = companyAPI.useRemoveFromFavouritesCompaniesMutation();
  const [activeTabButton, setActiveTabButton] = useState<string>('Все');
  const [searchParams, setSearchParams] = useSearchParams();
  const [companies, setCompanies] = useState<ICompany[]>([]);

  const view = searchParams.get('view');

  useEffect(() => {
    if (data) {
      const favouriteCompanies = data.filter(el => el.isFavourite);
      const nonFavouriteCompanies = data.filter(el => !el.isFavourite);
      const allCompanies = favouriteCompanies.concat(nonFavouriteCompanies);
      console.log(allCompanies);
      activeTabButton === 'Все' ? setCompanies(allCompanies) : setCompanies(allCompanies.filter(person => person.category === activeTabButton));
    }
  }, [data, activeTabButton])

  const tabs = [
    { tabname: 'Все', quantity: data?.length },
    { tabname: CategoriesEnum.MY_KOMPANIES, quantity: data?.filter(el => el.category === CategoriesEnum.MY_KOMPANIES).length },
    { tabname: CategoriesEnum.PARTNERS, quantity: data?.filter(el => el.category === CategoriesEnum.PARTNERS).length },
    { tabname: CategoriesEnum.CLIENTS, quantity: data?.filter(el => el.category === CategoriesEnum.CLIENTS).length },
    { tabname: CategoriesEnum.CUSTOMERS, quantity: data?.filter(el => el.category === CategoriesEnum.CUSTOMERS).length },
    { tabname: CategoriesEnum.BLACK_LIST, quantity: data?.filter(el => el.category === CategoriesEnum.BLACK_LIST).length },
    { tabname: CategoriesEnum.CLOSED, quantity: data?.filter(el => el.category === CategoriesEnum.CLOSED).length },
  ];



  return (
    <section className={styles.companies}>
      <div className={styles.companies__header}>
        <Tabs tabs={tabs} activeTabButton={activeTabButton} setActiveTabButton={setActiveTabButton} />
        <ChangeView />
      </div>
      <div className={styles.companies__body}>
        <ul className={clsx(styles.companies__list, { [styles.companies__list_grid]: view === 'grid'})}>
          {view === 'list' ?
            companies.map(el => 
              <Company key={el.id} name={el.name} legalName={el.legalName} country={el.country} deleteCompany={deleteCompany} addToFavourite={addToFavourite}
                region={el.region} direction={el.direction} isFavourite={el.isFavourite} removeFromFavourite={removeFromFavourite} company={el}/>
              )
            : companies.map(el => 
              <CompanyGrid key={el.id} name={el.name} country={el.country} deleteCompany={deleteCompany} addToFavourite={addToFavourite}
                region={el.region} direction={el.direction} isFavourite={el.isFavourite} removeFromFavourite={removeFromFavourite} object={el} />
              )
          }
        </ul>
      </div>
    </section>
  )

}
export default Companies;