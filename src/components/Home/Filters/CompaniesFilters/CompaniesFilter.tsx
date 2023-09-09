import React, { useEffect, useRef, useState } from 'react';
import styles from './CompaniesFilter.module.scss';
import { BsSearch } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdOutlineCancel } from 'react-icons/md';
import { GiSettingsKnobs } from 'react-icons/gi';
import clsx from 'clsx';
import useAppSelector from '../../../../hooks/useAppSelector';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { deleteChosenCountries, deleteChosenRegions, setChosenCountries, setChosenRegions, setSearchValue, setTimeEndsAt, setTimeStartsAt } from '../../../../store/reducers/companyFilters';
import { set } from 'react-hook-form';
/* ============================================================================================================================= */
interface SpoilerItemProps {
  name: string;
  isOpenSpoiler: boolean;
  handleOpenSpoiler: (index: number) => void;
  index: number;
}
interface CountriesItemProps {
  name: string
}
interface RegionsItemProps {
  name: string
}
/* ============================================================================================================================= */
const CountriesItem: React.FC<CountriesItemProps> = ({ name }) => {
  const { chosenCountries, finalData } = useAppSelector(state => state.companiesFilter);
  const [number, setNumber] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    chosenCountries.includes(name) ?
      dispatch(deleteChosenCountries(chosenCountries.filter(el => el !== name)))
      : dispatch(setChosenCountries(name))
  }

  const count = finalData.filter(el => el.country === name).length;
  console.log(count);
  useEffect(() => {
    if (chosenCountries.length) {
      setNumber(number);
    } else {
      setNumber(count);
    }
  }, [count])

  return (
    <li className={clsx(styles.item, { [styles.item_active]: chosenCountries.includes(name) })}>
      <div className={styles.item__checkbox}
        onClick={handleClick}
      ></div>
      <div className={styles.item__name}><span onClick={handleClick}>{name}</span></div>
      <div className={styles.item__quantity}>{number}</div>
    </li>
  );
}
/* ============================================================================================================================= */
const WorkTimeItem = () => {
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
/* ============================================================================================================================= */
const RegionsItem: React.FC<RegionsItemProps> = ({ name }) => {
  const { chosenRegions, finalData } = useAppSelector(state => state.companiesFilter);
  const [number, setNumber] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleAddRegions = (name: string) => {
    chosenRegions.includes(name) ?
      dispatch(deleteChosenRegions(chosenRegions.filter(el => el !== name)))
      : dispatch(setChosenRegions(name))
  }

  const count = finalData.filter(el => el.region === name).length;
  useEffect(() => {
    if (chosenRegions.length) {
      setNumber(number);
    } else {
      setNumber(count);
    }
  }, [count])

  return (
    <li className={clsx(styles.item, { [styles.item_active]: chosenRegions.includes(name) })}>
      <div className={styles.item__checkbox}
        onClick={() => handleAddRegions(name)}
      ></div>
      <div className={styles.item__name}><span onClick={() => handleAddRegions(name)}>{name}</span></div>
      <div className={styles.item__quantity}>{number}</div>
    </li>
  );
}

/* ======================================SPOILERITEM=========================================================================== */
const SpoilerItem: React.FC<SpoilerItemProps> = ({ index, name, isOpenSpoiler, handleOpenSpoiler }) => {

  const [listHeight, setListHeight] = useState<number>();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.getBoundingClientRect().height);
    }
  }, [])

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
                <CountriesItem name={el} key={el} />
              )
            }
            {name === 'По регионам' &&
              regions.map(el =>
                <RegionsItem name={el} key={el} />
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

  const spoilers = [
    {
      name: 'По странам',
    },
    {
      name: 'По регионам',
    },
    {
      name: 'Время работы',
    }
  ]

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
          <SpoilerItem index={index} name={el.name} isOpenSpoiler={openSpoilers.includes(index)} handleOpenSpoiler={handleOpenSpoiler} key={el.name} />
        )}
      </div>
    </section>
  )

}
export default CompaniesFilter;