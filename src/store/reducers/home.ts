import { PayloadAction, createSlice } from "@reduxjs/toolkit"


interface HomeState {
  isSidebarOpen: boolean,
}

const initialState: HomeState = {
  isSidebarOpen: false,
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    }
  }
})

export default homeSlice.reducer;
export const { setSidebarOpen } = homeSlice.actions;


// export { setSidebarOpen } = homeSlice.actions