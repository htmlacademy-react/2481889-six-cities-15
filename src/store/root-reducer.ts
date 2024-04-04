import { combineReducers } from 'redux';
import { authSlice } from '../slices/auth/auth';
import { offerSlice } from '../slices/offer/offer';

import { offersSlice } from '../slices/offers/offers';
import { AppData } from '../constants';
import { nearPlacesSlice } from '../slices/near-places/near-places';
import { reviewsSlice } from '../slices/reviews/reviews';
import { favoritesSlice } from '../slices/favorites/favorites';

export const rootReducer = combineReducers({
  [AppData.Offers]: offersSlice.reducer,
  [AppData.Auth]: authSlice.reducer,
  [AppData.Offer]: offerSlice.reducer,
  [AppData.NearPlaces]: nearPlacesSlice.reducer,
  [AppData.Reviews]: reviewsSlice.reducer,
  [AppData.Favorites]: favoritesSlice.reducer
});
