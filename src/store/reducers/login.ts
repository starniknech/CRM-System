import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IResponseData } from "../../models/ILogin";
import { fetchLoginData } from "../actionCreators/loginActionCreator";
import { UnknownAsyncThunkRejectedWithValueAction } from "@reduxjs/toolkit/dist/matchers";

interface LoginState {
  username: null | string;
  rememberMe: boolean;
  isLoading: boolean;
  error: string;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
}

const initialState: LoginState = {
  username: null,
  rememberMe: false,
  isLoading: false,
  error: '',
  firstName: null,
  lastName: null,
  image: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchLoginData.fulfilled, (state, action: PayloadAction<IResponseData>) => {
      state.isLoading = false;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.image = action.payload.image;
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

export default loginSlice.reducer;