import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseData } from "../../models/ILogin";
import { fetchLoginData } from "../actionCreators/loginActionCreator";

interface IUserData {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string;
}

interface LoginState {
  user: IUserData
  isLoading: boolean;
  error: string;
  isAuthorized: boolean
}

const initialState: LoginState = {
  user: {
    username: null,
    firstName: null,
    lastName: null,
    avatar: '',
  } as IUserData,
  isLoading: false,
  error: '',
  isAuthorized: false
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IResponseData>) => {
      state.user.username = action.payload.username;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.avatar = action.payload.image;
    },
    setSignOut(state) {
      state.isAuthorized = false;
      state.user.username = null;
      state.user.firstName = null;
      state.user.lastName = null;
      state.user.avatar = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchLoginData.fulfilled, (state, action: PayloadAction<IResponseData>) => {
      state.isLoading = false;
      state.user.username = action.payload.username;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.avatar = action.payload.image;
      state.isAuthorized = true;
    })
    builder.addCase(fetchLoginData.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchLoginData.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  },
})

export const { setUser, setSignOut } = loginSlice.actions;
export default loginSlice.reducer;