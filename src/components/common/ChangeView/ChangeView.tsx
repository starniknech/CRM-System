import React, {useEffect} from 'react';
import styles from './ChangeView.module.scss';
import clsx from 'clsx';
import { ViewEnum } from './ViewEnum';
import { AiFillAppstore, AiOutlineUnorderedList } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';



const ChangeView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = searchParams.get('view');
  const setViewParams = (view: ViewEnum) => {
    setSearchParams({
      view: view
    })
  }

  useEffect(() => {
    if (view === 'grid') {
      setViewParams(ViewEnum.GRID);
    } else {
      setViewParams(ViewEnum.LIST);
    }
  }, [])

  return (
    <div className={styles.changeView}>
      <button className={clsx(styles.changeView__buttonList, { [styles.changeView__buttonList_active]: view === 'list' })}
        onClick={() => setViewParams(ViewEnum.LIST)} ><AiOutlineUnorderedList /></button>
      <button className={clsx(styles.changeView__buttonGrid, { [styles.changeView__buttonGrid_active]: view === 'grid' })}
        onClick={() => setViewParams(ViewEnum.GRID)}><AiFillAppstore /></button>
    </div>
  )

}
export default ChangeView;