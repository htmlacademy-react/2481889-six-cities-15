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
});

export const { setAuthorizationStatus } = authSlice.actions;
