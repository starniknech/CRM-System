import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ViewEnum } from "../../components/common/ChangeView/ViewEnum";


interface HomeState {
  peopleView: string;
  companiesView: string,
}

const initialState: HomeState = {
  peopleView: ViewEnum.LIST,
  companiesView: ViewEnum.LIST,
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPeopleView(state, action: PayloadAction<string>) {
      state.peopleView = action.payload;
    },
    setCompaniesView(state, action: PayloadAction<string>) {
      state.companiesView = action.payload;
    },
  }
})

export const { setPeopleView, setCompaniesView } = homeSlice.actions;
export default homeSlice.reducer;