import { CITIES, Sorts } from '../constants';
import { offers } from '../mocks/offers';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    setSort: (state, action:PayloadAction<string>) => {
      state.sort = action.payload;
    }
  }
});

const offersAction = offersSlice.actions;

export {offersAction, offersSlice};
