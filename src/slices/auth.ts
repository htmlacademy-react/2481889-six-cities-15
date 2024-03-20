import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../constants';
import { Nullable } from '../types/nullable';

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
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    email: (state) => state.email
  }
});

export const authSelectors = authSlice.selectors;

export const { setAuthorizationStatus, setEmail } = authSlice.actions;
