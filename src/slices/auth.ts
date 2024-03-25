import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../constants';
import { Nullable } from '../types/nullable';
import { checkAuthAction, loginAction, logoutAction } from '../store/api-actions';

type AuthState = {
    authorizationStatus: AuthorizationStatus;
    email: Nullable<string>;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setEmail: (state, action: PayloadAction<Nullable<string>>) => {
      state.email = action.payload;
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
    email: (state) => state.email
  },
});

export const authSelectors = authSlice.selectors;

export const { setAuthorizationStatus, setEmail } = authSlice.actions;
