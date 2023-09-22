import { useState } from 'react';

export const useElemMenu = () => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const handleOpenMenu = () => {
    if (!isOpenMenu)
      setOpenMenu(true);
    else
      setOpenMenu(false);
  }

  return { handleOpenMenu, isOpenMenu };
}