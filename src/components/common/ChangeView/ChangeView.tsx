import React from 'react';
import styles from './ChangeView.module.scss';
import clsx from 'clsx';
import { ViewEnum } from './ViewEnum';
import { AiFillAppstore, AiOutlineUnorderedList } from 'react-icons/ai';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setCompaniesView, setPeopleView } from '../../../store/reducers/home';

interface ChangeViewProps {
  view: string;
  page: string
}

const ChangeView: React.FC<ChangeViewProps> = ({  view, page }) => {
  const dispatch = useAppDispatch();

  const handleClick = (view: ViewEnum) => {
    if (page === 'people') {
      window.sessionStorage.setItem('peopleView', view);
      dispatch(setPeopleView(view));
    } else if (page === 'companies') {
      window.sessionStorage.setItem('companiesView', view);
      dispatch(setCompaniesView(view));
    }
  }

  return (
    <div className={styles.changeView}>
      <button className={clsx(styles.changeView__buttonList, { [styles.changeView__buttonList_active]: view === ViewEnum.LIST })}
        onClick={() => handleClick(ViewEnum.LIST)} ><AiOutlineUnorderedList /></button>
      <button className={clsx(styles.changeView__buttonGrid, { [styles.changeView__buttonGrid_active]: view === ViewEnum.GRID })}
        onClick={() => handleClick(ViewEnum.GRID)}><AiFillAppstore /></button>
    </div>
  )

}
export default ChangeView;