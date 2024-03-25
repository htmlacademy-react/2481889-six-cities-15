import { combineReducers } from 'redux';
import { authSlice } from '../slices/auth';
import { offerSlice } from '../slices/offer';

import { offersSlice } from '../slices/offers';
import { AppData } from '../constants';

export const rootReducer = combineReducers({
  [AppData.Offers]: offersSlice.reducer,
  [AppData.Auth]: authSlice.reducer,
  [AppData.Offer]: offerSlice.reducer,
});
