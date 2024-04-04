import { Action, ThunkDispatch } from '@reduxjs/toolkit/react';
import { createAPI } from '../services/api';
import { State } from '../types/store';
import { AuthorizationStatus, CITIES, NOTCHECK, Sorts } from '../constants';
import { makeMockOffers } from './util';

export type AppThunkDispatch =
    ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const makeFakeStore = (initialState?: Partial<State>): State => ({
  auth: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
  favorites: {favorites:[], isFavoritesDataLoading: false},
  nearPlaces: {nearPlaces: [], isNearPlacesDataLoading: false},
  reviews: {reviews: [],
    isReviewsDataLoading: false,
    blockForm: false,
    commentaryText : '',
    rating : NOTCHECK,
  },
  offer: {offer: null, isOfferDataLoading: false, isOfferNotFound: false},
  offers: {city: CITIES[0], offers: makeMockOffers(), isOffersDataLoading:false, sort:Sorts.Popular},
  ...initialState ?? {},
});
