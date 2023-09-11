import React, { useState, useEffect } from 'react';
import styles from './Companies.module.scss';
import { companyAPI } from '../../../store/reducers/companyQuery';
import { CategoriesEnum, ICompany } from '../../../models/ICompany';
import Tabs from '../../common/Tabs/Tabs';
import ChangeView from '../../common/ChangeView/ChangeView';
import Company from './Company/Company';
import CompanyGrid from './Company/CompanyGrid/CompanyGrid';
import clsx from 'clsx';
import useAppSelector from '../../../hooks/useAppSelector';
import Preloader from '../../common/Preloader/Preloader';
import { setFinalData } from '../../../store/reducers/companyFilters';
import useAppDispatch from '../../../hooks/useAppDispatch';
import CompaniesFilter from '../Filters/CompaniesFilters/CompaniesFilter';
import { ViewEnum } from '../../common/ChangeView/ViewEnum';
import { setCompaniesView } from '../../../store/reducers/home';


const Companies:React.FC = () => {
  const { data, isLoading, error } = companyAPI.useFetchCompaniesQuery(100);
  const [deleteCompany, { error: deleteError, isLoading: isDeleteLoading }] = companyAPI.useDeleteCompanyMutation();
  const [toggleFavourite, { error: toggleError, isLoading: isToggleLoading }] = companyAPI.useToggleFavouriteCompaniesMutation();
  const [activeTabButton, setActiveTabButton] = useState<string>('Все');
  const { searchValue, chosenCountries, chosenRegions, timeStartsAt, timeEndsAt } = useAppSelector(state => state.companiesFilter);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([]);
  const dispatch = useAppDispatch();
  const { companiesView } = useAppSelector(state => state.home);

  useEffect(() => {
    const companiesView = localStorage.getItem('companiesView');
    if (companiesView) {
      dispatch(setCompaniesView(companiesView));
    }
  }, [])

  useEffect(() => {
    if (data) {

      const filteredCompaniesByWorkTime = data.filter(el => (el.worktimeStarts === timeStartsAt) && (el.worktimeEnds === timeEndsAt));

      if (searchValue) {
        const filteredData = filteredCompaniesByWorkTime.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()))
        if (chosenCountries.length) {
          const filteredData2 = filteredData.filter(el => chosenCountries.includes(el.country));
          if (chosenRegions.length) {
            const filteredData3 = filteredData2.filter(el => chosenRegions.includes(el.region));
            setFilteredCompanies(filteredData3);
          } else setFilteredCompanies(filteredData2);
        } else if (chosenRegions.length) {
          const filteredData2 = filteredData.filter(el => chosenRegions.includes(el.region));
          if (chosenCountries.length) {
            const filteredData3 = filteredData2.filter(el => chosenCountries.includes(el.country));
            setFilteredCompanies(filteredData3);
          } else setFilteredCompanies(filteredData2)
        } else setFilteredCompanies(filteredData);

      } else if (chosenCountries.length) {
        const filteredData = filteredCompaniesByWorkTime.filter(el => chosenCountries.includes(el.country));
        if (chosenRegions.length) {
          const filteredData2 = filteredData.filter(el => chosenRegions.includes(el.region));
          if (searchValue) {
            const filteredData3 = filteredData2.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredCompanies(filteredData3);
          } else setFilteredCompanies(filteredData2);
        } else if (searchValue) {
          const filteredData2 = filteredData.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
          if (chosenRegions.length) {
            const filteredData3 = filteredData2.filter(el => chosenRegions.includes(el.region));
            setFilteredCompanies(filteredData3);
          } else setFilteredCompanies(filteredData2);
        } else setFilteredCompanies(filteredData);

      } else if (chosenRegions.length) {
        const filteredData = filteredCompaniesByWorkTime.filter(el => chosenRegions.includes(el.region));
        if (chosenCountries.length) {
          const filteredData2 = filteredData.filter(el => chosenCountries.includes(el.country));
          if (searchValue) {
            const filteredData3 = filteredData2.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
            setFilteredCompanies(filteredData3);
          } else setFilteredCompanies(filteredData2);
        } else if (searchValue) {
          const filteredData2 = filteredData.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
          if (chosenCountries.length) {
            const filteredData3 = filteredData2.filter(el => chosenCountries.includes(el.country));
            setFilteredCompanies(filteredData3);
          } else setFilteredCompanies(filteredData2);
        } else setFilteredCompanies(filteredData)
      } else setFilteredCompanies(filteredCompaniesByWorkTime);
    }
  }, [timeStartsAt, timeEndsAt, searchValue, chosenCountries, chosenRegions, data]);

  useEffect(() => {
    dispatch(setFinalData(filteredCompanies));
    const favouriteCompanies = filteredCompanies.filter(el => el.isFavourite);
    const nonFavouriteCompanies = filteredCompanies.filter(el => !el.isFavourite);
    const allCompanies = favouriteCompanies.concat(nonFavouriteCompanies);
    activeTabButton === 'Все' ? setCompanies(allCompanies) : setCompanies(allCompanies.filter(person => person.category === activeTabButton));
  }, [filteredCompanies, activeTabButton, timeStartsAt, timeEndsAt]);

  const tabs = [
    { tabname: 'Все', quantity: filteredCompanies.length },
    { tabname: CategoriesEnum.MY_KOMPANIES, quantity: filteredCompanies.filter(el => el.category === CategoriesEnum.MY_KOMPANIES).length },
    { tabname: CategoriesEnum.PARTNERS, quantity: filteredCompanies.filter(el => el.category === CategoriesEnum.PARTNERS).length },
    { tabname: CategoriesEnum.CLIENTS, quantity: filteredCompanies.filter(el => el.category === CategoriesEnum.CLIENTS).length },
    { tabname: CategoriesEnum.CUSTOMERS, quantity: filteredCompanies.filter(el => el.category === CategoriesEnum.CUSTOMERS).length },
    { tabname: CategoriesEnum.BLACK_LIST, quantity: filteredCompanies.filter(el => el.category === CategoriesEnum.BLACK_LIST).length },
    { tabname: CategoriesEnum.CLOSED, quantity: filteredCompanies.filter(el => el.category === CategoriesEnum.CLOSED).length },
  ];


  return (
    <>
      {isLoading || isDeleteLoading || isToggleLoading ?
        <div className={styles.preloader}>
          <Preloader />
        </div>
        : <>
          <CompaniesFilter />
          {(error || toggleError || deleteError) ?
            <h2 className={styles.error}>Произошла ошибка при загрузке компаний...</h2>
            : <section className={styles.companies}>
              <div className={styles.companies__header}>
                <Tabs tabs={tabs} activeTabButton={activeTabButton} setActiveTabButton={setActiveTabButton} />
                <ChangeView view={companiesView} page='companies' />
              </div>
              <div className={styles.companies__body}>
                <ul className={clsx(styles.companies__list, { [styles.companies__list_grid]: companiesView === ViewEnum.GRID })}>
                  {companiesView === ViewEnum.LIST ?
                    companies.map(el =>
                      <Company id={el.id} key={el.id} name={el.name} legalName={el.legalName} country={el.country} deleteCompany={deleteCompany} toggleFavourite={toggleFavourite}
                        region={el.region} direction={el.direction} isFavourite={el.isFavourite} company={el} />
                    )
                    : companies.map(el =>
                      <CompanyGrid key={el.id} id={el.id} name={el.name} country={el.country} deleteCompany={deleteCompany} toggleFavourite={toggleFavourite}
                        region={el.region} direction={el.direction} isFavourite={el.isFavourite}  object={el} />
                    )
                  }
                </ul>
              </div>
            </section>
          }
        </>
      }
    </>
  )

}
export default Companies;