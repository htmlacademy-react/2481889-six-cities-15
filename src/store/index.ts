import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from '../slices/offers';
import { createAPI } from '../services/api';
import { authSlice } from '../slices/auth';
import { globalSlice } from '../slices/global';

const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [globalSlice.name]: globalSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: api,
      }
    })
});
