import { useState } from 'react';
import styles from './App.module.scss';
import Login from "./Login/Login";
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';

const loggedIn = Boolean(window.localStorage.getItem('isLoggedIn'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={loggedIn ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
