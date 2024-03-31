import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData, AuthorizationStatus } from '../constants';
import { Nullable } from '../types/nullable';
import { checkAuthAction, loginAction, logoutAction } from '../store/api-actions';
import { UserData } from '../types/user-data';

type AuthState = {
    authorizationStatus: AuthorizationStatus;
    user: Nullable<UserData>;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const authSlice = createSlice({
  name: AppData.Auth,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<Nullable<UserData>>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    user: (state) => state.user
  },
});


export const authSelectors = authSlice.selectors;

export const { setAuthorizationStatus, setUser } = authSlice.actions;
