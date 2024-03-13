import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from '../actions/action';
import { offers } from '../mocks/offers';
import { Cities } from '../mocks/city';

const initalState = {
  city: Cities[0],
  offers: offers,
};

const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
export {reducer};
