import { combineReducers } from 'redux';
import { authSlice } from '../slices/auth';
import { offersSlice } from '../slices/offers';
import { offerSlice } from '../slices/offer';
import { globalSlice } from '../slices/global';

export const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [globalSlice.name]: globalSlice.reducer
});
