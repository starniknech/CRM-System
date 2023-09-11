import React, { useState, useEffect, useRef, SetStateAction } from "react";
import styles from "./PeopleFilters.module.scss";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { MdOutlineCancel, MdKeyboardArrowDown } from "react-icons/md";
import clsx from "clsx";
import { peopleApi } from "../../../../store/reducers/peopleQuery";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import { setFiltredPeople } from "../../../../store/reducers/people";
import { CompaniesEnum, PositionsEnum } from "../../../../models/IPerson";
import useAppSelector from "../../../../hooks/useAppSelector";
import CheckItem from "../commonFilters/CheckItem/CheckItem";
/* ======================ITEMS============================================================================================ */
interface ItemCompanyProps {
  name: string;
  setChosenCompany: (company: string) => void;
  chosenCompany: string;
}
interface IItem {
  name: PositionsEnum | CompaniesEnum;
}
interface ISpoiler {
  category: string;
  label: string;
  list: IItem[];
}
interface SpoilerItemProps {
  spoiler: ISpoiler;
  index: number;
  isOpenSpoiler: boolean;
  handleOpenSpoiler: (index: number) => void;
  setChosenPositions: (cb: SetStateAction<string[]>) => void;
  setChosenCompany: (company: string) => void;
  chosenCompany: string;
  chosenPositions: string[];
}
/* ============================================================================================================================= */
const CompanyItem: React.FC<ItemCompanyProps> = ({ name, setChosenCompany, chosenCompany }) => {
  const { filteredPeople } = useAppSelector(state => state.people);
  const [number, setNumber] = useState<number>(0);


  const handleSetCompany = (name: string) => {
    if (chosenCompany === name) {
      setChosenCompany('');
    } else setChosenCompany(name);
  }
  const count = filteredPeople.filter(el => el.company === name).length

  useEffect(() => {
    if (chosenCompany) {
      setNumber(number);
    } else {
      setNumber(count);
    }
  }, [count])


  return (
    <li className={clsx(styles.companies__item, { [styles.companies__item_active]: chosenCompany === name })} >
      <div onClick={() => handleSetCompany(name)} className={styles.companies__avatar}></div>
      <div className={styles.companies__name} ><span onClick={() => handleSetCompany(name)}>{name}</span></div>
      <div className={styles.companies__quantity}>{number}</div>
    </li>
  );
}

const SpoilerItem: React.FC<SpoilerItemProps> = ({ chosenCompany, chosenPositions, spoiler, index, isOpenSpoiler, handleOpenSpoiler, setChosenCompany, setChosenPositions }) => {
  const [listHeight, setListHeight] = useState<number>();
  const listRef = useRef<HTMLUListElement>(null);
  const { filteredPeople } = useAppSelector(state => state.people);

  const setPositionsCount = (name: string): number => {
    return filteredPeople.filter(el => el.position === name).length;
  }

  const handleAddPosition = (name: string) => {
    if (chosenPositions.includes(name)) {
      setChosenPositions(actual => actual.filter(el => el !== name));
    } else setChosenPositions(actual => [...actual, name]);
  }

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.getBoundingClientRect().height);
    }
  }, [])

  return (
    <div className={styles.spoiler}>
      <button
        onClick={() => handleOpenSpoiler(index)}
        className={clsx(styles.spoiler__button, { [styles.spoiler__button_active]: isOpenSpoiler })}>
        <div className={styles.spoiler__label}>{spoiler.label}</div>
        <div className={clsx(styles.spoiler__arrow, { [styles.spoiler__arrow_active]: isOpenSpoiler })}><MdKeyboardArrowDown /></div>
      </button>
      <div className={clsx(styles.spoiler__collapse, { [styles.spoiler__collapse_active]: isOpenSpoiler })}
        style={isOpenSpoiler ? { height: listHeight } : { height: "0px" }}>
        <ul className={styles.spoiler__list} ref={listRef} >
          {spoiler.category === 'companies' &&
            spoiler.list.map(el => <CompanyItem chosenCompany={chosenCompany} setChosenCompany={setChosenCompany} key={el.name} name={el.name} />)
          }
          {spoiler.category === 'positions' &&
            spoiler.list.map(el => <CheckItem handleAddItem={handleAddPosition} setCount={setPositionsCount} chosenItems={chosenPositions} key={el.name} name={el.name} />)
          }
        </ul>
      </div>
    </div>
  );
}
/* =============================FILTERS COMPONENT======================================================================================== */
const PeopleFilters: React.FC = () => {
  const { data } = peopleApi.useFetchPeopleQuery(100);
  const [isOpenSpoiler, setOpenSpoiler] = useState<number[]>([0, 1]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [chosenCompany, setChosenCompany] = useState<string>('');
  const [chosenPositions, setChosenPositions] = useState<string[]>([])
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      if (searchValue) {
        const filteredData = data.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase())) //search
        if (chosenCompany) {
          const filteredData2 = filteredData.filter(el => el.company === chosenCompany)
          if (chosenPositions.length) {
            const filteredData3 = filteredData2.filter(item => chosenPositions.includes(item.position))
            dispatch(setFiltredPeople(filteredData3));
          } else dispatch(setFiltredPeople(filteredData2));
        } else if (chosenPositions.length) {
          const filteredData2 = filteredData.filter(item => chosenPositions.includes(item.position))
          if (chosenCompany) {
            const filteredData3 = filteredData2.filter(el => el.company === chosenCompany);
            dispatch(setFiltredPeople(filteredData3));
          } else dispatch(setFiltredPeople(filteredData2));
        } else {
          dispatch(setFiltredPeople(filteredData))
        }

      } else if (chosenCompany) {
        const filteredData = data.filter(el => el.company === chosenCompany);
        if (chosenPositions.length) {
          const filteredData2 = filteredData.filter(item => chosenPositions.includes(item.position))
          if (searchValue) {
            const filteredData3 = filteredData2.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()))
            dispatch(setFiltredPeople(filteredData3))
          } else dispatch(setFiltredPeople(filteredData2))
        } else if (searchValue) {
          const filteredData2 = filteredData.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
          if (chosenPositions.length) {
            const filteredData3 = filteredData2.filter(item => chosenPositions.includes(item.position));
            dispatch(setFiltredPeople(filteredData3));
          } else dispatch(setFiltredPeople(filteredData2));
        } else dispatch(setFiltredPeople(filteredData));

      } else if (chosenPositions.length) {
        const filteredData = data.filter(item => chosenPositions.includes(item.position));
        if (chosenCompany) {
          const filteredData2 = filteredData.filter(el => el.company === chosenCompany);
          if (searchValue) {
            const filteredData3 = filteredData2.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
            dispatch(setFiltredPeople(filteredData3));
          } else dispatch(setFiltredPeople(filteredData2));
        } else if (searchValue) {
          const filteredData2 = filteredData.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase()));
          if (chosenCompany) {
            const filteredData3 = filteredData2.filter(el => el.company === chosenCompany);
            dispatch(setFiltredPeople(filteredData3));
          } else dispatch(setFiltredPeople(filteredData2));
        } else dispatch(setFiltredPeople(filteredData));

      } else dispatch(setFiltredPeople(data));
    }
  }, [data, searchValue, chosenPositions, chosenCompany])



  const spoilers = [
    {
      category: 'companies',
      label: "МОИ Компании",
      list: [
        { name: CompaniesEnum.GLOBAL_SOLUTIONS },
        { name: CompaniesEnum.GLOBAL_SOLUTIONS_DEVELOPMENT },
        { name: CompaniesEnum.IT_FORMULA },
        { name: CompaniesEnum.PROMO_REPUBLIC },
      ]
    },
    {
      category: 'positions',
      label: "должность",
      list: [
        { name: PositionsEnum.HEAD_OF_IT_DEPARTMENT },
        { name: PositionsEnum.OFFICE_MANAGER },
        { name: PositionsEnum.SECURITY_GUARD },
        { name: PositionsEnum.FRONTEND_DEVELOPER },
        { name: PositionsEnum.MARKETER_SMM_SPECIALIST },
      ]
    }
  ]

  const handleOpenSpoiler = (index: number) => {
    if (isOpenSpoiler.includes(index)) {
      setOpenSpoiler(actual => {
        return actual.filter(el => el !== index);
      })
    } else {
      setOpenSpoiler(actual => [...actual, index]);
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  return (
    <section className={styles.filters}>
      <div className={styles.filters__inputContainer}>
        <label htmlFor="searchInput" className={styles.filters__searchIcon}>
          <BsSearch />
        </label>
        <input id="searchInput" value={searchValue} onChange={handleChange} placeholder="Найти" type="text" className={styles.filters__input} />
        {searchValue &&
          <div onClick={() => setSearchValue('')} className={styles.filters__cancelSearchIcon}>
            <MdOutlineCancel />
          </div>
        }
      </div>
      <div className={styles.filters__settingsTitle}>
        <h2 className={styles.filters__title}>Настроки фильтра</h2>
        <GiSettingsKnobs />
      </div>
      <div className={styles.spoilers}>
        {spoilers.map((spoiler, index) => (
          <SpoilerItem chosenCompany={chosenCompany} chosenPositions={chosenPositions} setChosenCompany={setChosenCompany} setChosenPositions={setChosenPositions}
            key={index} spoiler={spoiler} index={index}
            isOpenSpoiler={isOpenSpoiler.includes(index)} handleOpenSpoiler={handleOpenSpoiler} />
        ))}
      </div>
    </section>
  );
}



export default PeopleFilters;