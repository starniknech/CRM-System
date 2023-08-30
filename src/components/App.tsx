import React, { useMemo } from 'react';
import Login from "./Login/Login";
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import People from './Home/People/People';
import Companies from './Home/Companies/Companies';
import RequireAuth from '../hoc/RequireAuth';
import useAppDispatch from '../hooks/useAppDispatch';
import { setUser } from '../store/reducers/login';


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
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;