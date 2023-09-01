import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPerson } from "../../models/IPerson"


interface PeopleState {
  filteredPeople: IPerson[];
}

const initialState: PeopleState = {
  filteredPeople: [],
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setFiltredPeople(state, action: PayloadAction<IPerson[]>) {
      state.filteredPeople = action.payload;
    }
  }
})

export const { setFiltredPeople } = peopleSlice.actions;
export default peopleSlice.reducer;