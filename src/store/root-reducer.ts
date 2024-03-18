import { combineReducers } from 'redux';
import { authSlice } from '../slices/auth';
import { globalSlice } from '../slices/global';
import { offersSlice } from '../slices/offers';
import { offerSlice } from '../slices/offer';

export const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [globalSlice.name]: globalSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
});
