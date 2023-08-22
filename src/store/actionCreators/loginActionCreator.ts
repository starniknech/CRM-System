import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ILogin, IResponseData } from "../../models/ILogin"


export const fetchLoginData = createAsyncThunk(
  'login/fetchLoginData',
  async (userCredentials: ILogin, thunkAPI) => {
    const { login: username, password } = userCredentials
    try {
      const request = await axios.post<IResponseData>('https://dummyjson.com/auth/login', { username, password });
      const response = request.data;
      
      window.localStorage.setItem('user', JSON.stringify(response));
      window.localStorage.setItem("isLoggedIn", 'true');
      
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Некорректный логин или пароль');
    }
  }
)