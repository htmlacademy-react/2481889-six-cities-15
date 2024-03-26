import { AppData, CITIES, SORTS } from '../constants';
import { City } from '../types/city';
import { Offers } from '../types/offer';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Sort } from '../types/sort';
import { fetchOffersAction } from '../store/api-actions';

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
  name: AppData.Offers,
  reducers: {
    setCity: (state, action:PayloadAction<City>) => {
      state.city = action.payload;
    },
    setIsOffersDataLoading: (state, action:PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    setSort: (state, action:PayloadAction<Sort>) => {
      state.sort = action.payload;
    },

  },
  extraReducers(builder) {
    builder.addCase(fetchOffersAction.fulfilled, (state, action) =>{
      state.isOffersDataLoading = false;
      state.offers = action.payload;
    });
    builder.addCase(fetchOffersAction.pending, (state) =>{
      state.isOffersDataLoading = true;
    });
  },
  selectors: {
    city: (state:OffersState) => state.city,
    offers: (state:OffersState) => state.offers.filter((offer) => offer.city.name === state.city.name),
    sort: (state:OffersState) => state.sort,
    isOffersDataLoading: (state:OffersState) => state.isOffersDataLoading,
  }
});

const offersAction = {fetchOffersAction,...offersSlice.actions};
const offersSelectors = offersSlice.selectors;

export {offersAction, offersSlice, offersSelectors};
