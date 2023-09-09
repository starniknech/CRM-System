import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICompany } from "../../models/ICompany";

interface CompanyFilter {
  searchValue: string;
  chosenCountries: string[];
  chosenRegions: string[];
  timeStartsAt: number,
  timeEndsAt: number,
  finalData: ICompany[];
}

const initialState: CompanyFilter = {
  finalData: [],
  searchValue: '',
  chosenCountries: [],
  chosenRegions: [],
  timeStartsAt: 9,
  timeEndsAt: 17,
}

const companyFiltersSlice = createSlice({
  name: 'companyFilters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setChosenCountries(state, action: PayloadAction<string>) {
      state.chosenCountries = [...state.chosenCountries, action.payload];
    },
    deleteChosenCountries(state, action: PayloadAction<string[]>) {
      state.chosenCountries = action.payload;
    },

    setChosenRegions(state, action: PayloadAction<string>) {
      state.chosenRegions = [...state.chosenRegions, action.payload];
    },
    deleteChosenRegions(state, action: PayloadAction<string[]>) {
      state.chosenRegions = action.payload;
    },

    setTimeStartsAt(state, action: PayloadAction<number>) {
      state.timeStartsAt = action.payload;
    },
    setTimeEndsAt(state, action: PayloadAction<number>) {
      state.timeEndsAt = action.payload;
    },

    setFinalData(state, action: PayloadAction<ICompany[]>) {
      state.finalData = action.payload;
    }
  }
})

export const {
  setChosenCountries, setChosenRegions,
  setSearchValue, deleteChosenCountries, deleteChosenRegions,
  setTimeEndsAt, setTimeStartsAt, setFinalData
} = companyFiltersSlice.actions;

export default companyFiltersSlice.reducer;