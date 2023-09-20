import { useEffect } from "react";
import useAppDispatch from "./useAppDispatch"
import { setCompaniesView, setPeopleView } from "../store/reducers/home";


export const useSetView = (stringName: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const view = sessionStorage.getItem(stringName);
    if (view) {
      stringName === 'companiesView'
        ? dispatch(setCompaniesView(view))
        : dispatch(setPeopleView(view));
    }
  }, [])
}