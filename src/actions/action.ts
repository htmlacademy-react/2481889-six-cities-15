import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const setCity = createAction('SET_CITY', (city:City) => ({
  payload: city,}));
export const setOffers = createAction('SET_OFFERS', (offers:Offer[]) => ({payload: offers,}));
