import { combineReducers } from 'redux';
import { authSlice } from '../slices/auth';
import { globalSlice } from '../slices/global';
import { offersSlice } from '../slices/offers';

export const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [globalSlice.name]: globalSlice.reducer
});
