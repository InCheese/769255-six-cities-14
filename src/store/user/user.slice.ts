import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { TUserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from './user.api-actions';

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: '',
  token: '',
  name: '',
  avatarUrl: '',
  isPro: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

