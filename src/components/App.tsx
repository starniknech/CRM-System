import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import People from './Home/People/People';
import Companies from './Home/Companies/Companies';
import RequireAuth from '../hoc/RequireAuth';
import useAppDispatch from '../hooks/useAppDispatch';
import { setUser } from '../store/reducers/login';
import CompanyPage from './Pages/CompanyPage/CompanyPage';
import PeoplePage from './Pages/PeoplePage/PeoplePage';
import Login from './Pages/Login/Login';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const json = localStorage.getItem('user')
  useMemo(() => {
    if (json) {
      const user = JSON.parse(json)
      dispatch(setUser(user));
    }
  }, [json, dispatch])

  return (
    <>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }>
          <Route index element={<Navigate to={'/people'} replace />} /> 
          <Route path='people' element={<People />} />
          <Route path='companies' element={<Companies />} />
          <Route path='companies/:id' element={<CompanyPage />} />
          <Route path='people/:id' element={<PeoplePage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;