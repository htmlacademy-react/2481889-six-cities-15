import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers, setSort } from '../actions/action';
import { offers } from '../mocks/offers';
import { Cities } from '../mocks/city';
import { Sorts } from '../constants';

const initalState = {
  city: Cities[0],
  offers: offers,
  sort: Sorts.Popular
};

const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSort, (state, action) => {
      state.sort = action.payload;
    });
});
export {reducer};
