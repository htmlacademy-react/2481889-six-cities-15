import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData, AuthorizationStatus } from '../../constants';
import { Nullable } from '../../types/nullable';
import { checkAuthAction, loginAction, logoutAction } from '../../store/api-actions';
import { UserData } from '../../types/user-data';

type AuthState = {
    authorizationStatus: AuthorizationStatus;
    user: Nullable<UserData>;
}

export const initialState: AuthState = {
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
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  },
  selectors: {
    getAuthorizationStatus: (state) => state.authorizationStatus,
    getUser: (state) => state.user
  },
});


export const authSelectors = authSlice.selectors;

export const { setAuthorizationStatus } = authSlice.actions;
