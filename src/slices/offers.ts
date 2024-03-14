/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CITIES, Sorts } from '../constants';
import { offers } from '../mocks/offers';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Sort } from '../types/sort';

type offersState = {
    city: City;
    offers: Offer[];
    sort: Sort;
}
const initialState = {
  city: CITIES[0],
  offers: offers,
  sort: Sorts.Popular
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setCity: (state, action:PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action:PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setSort: (state, action:PayloadAction<Sort>) => {
      state.sort = action.payload;
    }
  },
  selectors: {
    city: (state:offersState) => state.city,
    offers: (state:offersState) => state.offers,
    sort: (state:offersState) => state.sort
  }
});

const offersAction = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export {offersAction, offersSlice, offersSelectors};
