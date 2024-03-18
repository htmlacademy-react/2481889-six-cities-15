import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../types/nullable';
import { Offer, Offers } from '../types/offer';
import { Reviews } from '../types/review';

export type OfferState ={
    offer: Nullable<Offer>;
    nearPlaces: Offers;
    reviews: Reviews;
    isOfferDataLoading: boolean;
    isOfferNotFound: boolean;
}

const initialState: OfferState = {
  offer: null,
  nearPlaces: [],
  reviews: [],
  isOfferDataLoading: true,
  isOfferNotFound: false,
};

export const offerSlice = createSlice({
  initialState, name:'offer',
  reducers: {
    setOffer: (state, action:PayloadAction<Offer>) => {
      state.offer = action.payload;
    },
    setNearPlaces: (state, action:PayloadAction<Offers>) => {
      state.nearPlaces = action.payload;
    },
    setReviews: (state, action:PayloadAction<Reviews>) => {
      state.reviews = action.payload;
    },
    setIsOfferDataLoading: (state, action:PayloadAction<boolean>) => {
      state.isOfferDataLoading = action.payload;
    },
    setIsOfferNotFound: (state, action:PayloadAction<boolean>) => {
      state.isOfferNotFound = action.payload;
    },
  },
  selectors: {
    offer: (state: OfferState) => state.offer,
    nearPlaces: (state: OfferState) => state.nearPlaces,
    reviews: (state: OfferState) => state.reviews,
    isOfferDataLoading: (state: OfferState) => state.isOfferDataLoading,
    isOfferNotFound: (state: OfferState) => state.isOfferNotFound,
  }});

export const { setOffer, setNearPlaces, setReviews, setIsOfferDataLoading,
  setIsOfferNotFound } = offerSlice.actions;

export const offerSelectors = offerSlice.selectors;
