import home from './reducers/home';
import loginSlice from './reducers/login';
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  login: loginSlice,
  home: home,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];