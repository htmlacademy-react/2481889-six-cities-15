import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../constants';

type AuthState = {
    authorizationStatus: AuthorizationStatus;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus
  }
});

export const authSelectors = authSlice.selectors;

export const { setAuthorizationStatus } = authSlice.actions;
