import { CITIES, SORTS } from '../constants';
import { City } from '../types/city';
import { Offers } from '../types/offer';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Sort } from '../types/sort';

export type OffersState = {
    city: City;
    offers: Offers;
    sort: Sort;
    isOffersDataLoading: boolean;
}
const initialState : OffersState = {
  city: CITIES[0],
  offers: [],
  sort: SORTS.Popular,
  isOffersDataLoading: false,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setCity: (state, action:PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action:PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
    setSort: (state, action:PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setIsOffersDataLoading: (state, action:PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    }
  },
  selectors: {
    city: (state:OffersState) => state.city,
    offers: (state:OffersState) => state.offers,
    sort: (state:OffersState) => state.sort,
    isOffersDataLoading: (state:OffersState) => state.isOffersDataLoading,
  }
});

const offersAction = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export {offersAction, offersSlice, offersSelectors};
