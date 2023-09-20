import { useEffect, useState } from "react";


export const useGetSpoilerHeight = (listRef: React.RefObject<HTMLUListElement>) => {
  const [listHeight, setListHeight] = useState<number>();

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.getBoundingClientRect().height);
    }
  }, [])

  return listHeight;
}