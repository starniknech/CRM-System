import React, { useState } from "react";
import styles from './Login.module.scss'
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchLoginData } from "../../store/actionCreators/loginActionCreator";
import { ILogin } from "../../models/ILogin";
import clsx from "clsx";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {  useLocation, useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const { error, isLoading } = useAppSelector(state => state.login);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const { register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILogin>({
    defaultValues: {
      login: 'kminchelle'
    }
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ILogin> = async (userCredentials) => {
    const result = await dispatch(fetchLoginData(userCredentials))
    if (result.payload && result.payload !== 'Некорректный логин или пароль') {
      navigate(fromPage, {replace: true});
    }
  }
  const requiredField = 'Поле обязательно *'

  return (
    <section className={styles.section}>
      <div className={styles.body}>
        <div><span className={styles.logo}>LOGOTYPE</span></div>
        <h2 className={styles.title}>Вход</h2>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="login">ЛОГИН</label>
            <input {...register('login', { required: requiredField })} type="text" id="login" className={clsx(styles.form__loginInput, {
              [styles.form__inputError]: errors.login || error,
            })} placeholder="Введите логин" />
            {errors.login && (
              <div className={clsx(styles.form__errorMessage, styles.loginMessage)}>{errors.login.message}</div>
            )}
          </div>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="password">ПАРОЛЬ</label>
            <input {...register('password', { required: requiredField })} type="password" id="password" className={clsx(styles.form__passwordInput, {
              [styles.form__inputError]: errors.password || error,
            })} placeholder="Введите пароль" />
            {errors.password && (
              <div className={clsx(styles.form__errorMessage, styles.passwordMessage)}>{errors.password.message}</div>
            )}
          </div>

          <div className={styles.form__rememberMe}>
            <input type="checkbox" className={styles.form__checkbox} id="checkbox" />
            <label className={styles.form__rememberMeLabel} htmlFor="checkbox">Запомнить меня</label>
          </div>
          <div className={styles.form__buttons}>
            <button className={styles.form__enterButton}>{isLoading ? 'Загрузка...' : 'Войти'}</button>
            <button className={styles.form__forgotPasswordButton} type="button" onClick={() => setValue('password', '0lelplR')} >Волшебная кнопка</button>
          </div>
          {error && (
            <div className={styles.form__error}>{error}</div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Login;