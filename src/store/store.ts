import { peopleApi } from './reducers/peopleQuery';
import home from './reducers/home';
import loginSlice from './reducers/login';
import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import people from './reducers/people';

const rootReducer = combineReducers({
  login: loginSlice,
  home: home,
  [peopleApi.reducerPath]: peopleApi.reducer,
  people: people,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(peopleApi.middleware)
    }
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];