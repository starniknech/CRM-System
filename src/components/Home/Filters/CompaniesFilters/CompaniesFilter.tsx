import React, { useEffect, useRef, useState } from 'react';
import styles from './CompaniesFilter.module.scss';
import { BsSearch } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdOutlineCancel } from 'react-icons/md';
import { GiSettingsKnobs } from 'react-icons/gi';
import clsx from 'clsx';
import useAppSelector from '../../../../hooks/useAppSelector';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { deleteChosenCountries, deleteChosenRegions, setChosenCountries, setChosenRegions, setSearchValue, setTimeEndsAt, setTimeStartsAt } from '../../../../store/reducers/companyFilters';
import CheckItem from '../commonFilters/CheckItem/CheckItem';
/* ============================================================================================================================= */
interface SpoilerItemProps {
  name: string;
  isOpenSpoiler: boolean;
  handleOpenSpoiler: (index: number) => void;
  index: number;
}
/* ============================================================================================================================= */
const WorkTimeItem:React.FC = () => {
  const { timeStartsAt, timeEndsAt } = useAppSelector(state => state.companiesFilter);
  const dispatch = useAppDispatch();
  const rangeDistance = 24;

  const fromHandleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => { // логика по запрещению перескакивания здесь
    const number = parseInt(e.target.value, 10);
    if (number >= (timeEndsAt - 1)) {
      dispatch(setTimeStartsAt(timeEndsAt - 2));
    } else {
      dispatch(setTimeStartsAt(number));
    }
  }
  const toHandleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(e.target.value, 10);
    if (number <= (timeStartsAt + 1)) {
      dispatch(setTimeEndsAt(timeStartsAt + 2));
    } else {
      dispatch(setTimeEndsAt(number));
    }
  }
  const time = ['00:00', '6:00', '12:00', '18:00', '24:00'];

  return (
    <div className={styles.workTimeItem}>
      <div className={styles.workTimeItem__header}>
        <div className={styles.workTimeItem__time}>
          <span className={styles.workTimeItem__startsAt}>{timeStartsAt}</span>:00 -
          <span className={styles.workTimeItem__endsAt}> {timeEndsAt}</span>:00
        </div>
        <div className={styles.workTimeItem__weekDays}>
          Пн - Пт
        </div>
      </div>
      <div className={styles.range}>
        <div className={styles.range__container}>
          <div className={styles.range__slidersControl}>
            <input className={clsx(styles.range__rangeInput, styles.range__fromRangeInput)}
              onChange={fromHandleChangeRange}
              type="range" value={timeStartsAt} min="0" max={rangeDistance} />
            <input className={styles.range__rangeInput}
              onChange={toHandleChangeRange}
              style={{
                background: `linear-gradient(
                to right,
                ${'#D3DCE6'} 0%,
                ${'#D3DCE6'} ${(timeStartsAt) / (rangeDistance) * 100}%,
                ${'#1F2D3D'} ${((timeStartsAt) / (rangeDistance)) * 100}%,
                ${'#1F2D3D'} ${(timeEndsAt) / (rangeDistance) * 100}%, 
                ${'#D3DCE6'} ${(timeEndsAt) / (rangeDistance) * 100}%, 
                ${'#D3DCE6'} 100%)`
              }}
              type="range" value={timeEndsAt} min="0" max={rangeDistance} />
          </div>
        </div>
        <div className={styles.range__footer}>
          {time.map(el =>
            <div className={styles.range__footer__item} key={el} >{el}</div>
          )}
        </div>
        <br />
        <br />
        <div className={styles.workTimeItem__reference} >**Доступное время для работы: <br />
          с 8 до 16,   с 9 до 17,   с 10 до 18.
        </div>
      </div>
    </div>
  );
}
/* ======================================SPOILERITEM=========================================================================== */
const SpoilerItem: React.FC<SpoilerItemProps> = ({ index, name, isOpenSpoiler, handleOpenSpoiler }) => {
  const { chosenRegions, chosenCountries, finalData } = useAppSelector(state => state.companiesFilter);
  const [listHeight, setListHeight] = useState<number>();
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.getBoundingClientRect().height);
    }
  }, [])

  const handleAddRegion = (name: string) => {
    chosenRegions.includes(name)
      ? dispatch(deleteChosenRegions(chosenRegions.filter(el => el !== name)))
      : dispatch(setChosenRegions(name));
  }
  const handleAddCountry = (name: string) => {
    chosenCountries.includes(name)
      ? dispatch(deleteChosenCountries(chosenCountries.filter(el => el !== name)))
      : dispatch(setChosenCountries(name));
  }

  const setRegiosnCount = (name: string): number => {
    return finalData.filter(el => el.region === name).length;
  }
  const setCountriesCount = (name: string): number => {
    return finalData.filter(el => el.country === name).length;
  }

  const countries = ['Узбекистан', 'Германия', 'Испания'];
  const regions = ['Ташкент', 'Самарканд', 'Берлин', 'Мюнхен', 'Мадрид', 'Барселона'];

  return (
    <div className={styles.spoiler}>
      <button
        onClick={() => handleOpenSpoiler(index)}
        className={clsx(styles.spoiler__button, { [styles.spoiler__button_active]: isOpenSpoiler })}>
        <div className={styles.spoiler__label}>{name}</div>
        <div className={clsx(styles.spoiler__arrow, { [styles.spoiler__arrow_active]: isOpenSpoiler })}><MdKeyboardArrowDown /></div>
      </button>
      <div className={clsx(styles.spoiler__collapse, { [styles.spoiler__collapse_active]: isOpenSpoiler })}
        style={isOpenSpoiler ? { height: listHeight } : { height: "0px" }}>
        {name === 'Время работы' ?
          <WorkTimeItem />
          :
          <ul className={styles.spoiler__list} ref={listRef} >
            {name === 'По странам' &&
              countries.map(el =>
                <CheckItem handleAddItem={handleAddCountry} setCount={setCountriesCount} chosenItems={chosenCountries} name={el} key={el} />
              )
            }
            {name === 'По регионам' &&
              regions.map(el =>
                <CheckItem setCount={setRegiosnCount} chosenItems={chosenRegions} handleAddItem={handleAddRegion} name={el} key={el} />
              )
            }
          </ul>}
      </div>
    </div>
  );
}

/* ============================================================================================================================= */
const CompaniesFilter: React.FC = () => {
  const [openSpoilers, setOpenSpoilers] = useState<number[]>([0, 1, 2]);
  const { searchValue } = useAppSelector(state => state.companiesFilter);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  }

  const spoilers = ['По странам', 'По регионам', 'Время работы'];

  const handleOpenSpoiler = (index: number) => {
    if (openSpoilers.includes(index)) {
      setOpenSpoilers(actual => {
        return actual.filter(el => el !== index);
      })
    } else {
      setOpenSpoilers(actual => [...actual, index]);
    }
  }

  return (
    <section className={styles.filters}>
      <div className={styles.filters__inputContainer}>
        <label htmlFor="searchInput" className={styles.filters__searchIcon}>
          <BsSearch />
        </label>
        <input id="searchInput" value={searchValue} onChange={handleChange} placeholder="Найти" type="text" className={styles.filters__input} />
        {searchValue &&
          <div onClick={() => dispatch(setSearchValue(''))} className={styles.filters__cancelSearchIcon}>
            <MdOutlineCancel />
          </div>
        }
      </div>
      <div className={styles.filters__settingsTitle}>
        <h2 className={styles.filters__title}>Настроки фильтра</h2>
        <GiSettingsKnobs />
      </div>
      <div className={styles.spoilers}>
        {spoilers.map((el, index) =>
          <SpoilerItem index={index} name={el} isOpenSpoiler={openSpoilers.includes(index)} handleOpenSpoiler={handleOpenSpoiler} key={el} />
        )}
      </div>
    </section>
  )

}
export default CompaniesFilter;