import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../types/nullable';
import { Offer, Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { fetchNearPlacesAction, fetchOfferAction, fetchReviewsAction } from '../store/api-actions';

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
    setIsOfferDataLoading: (state, action:PayloadAction<boolean>) => {
      state.isOfferDataLoading = action.payload;
    },
    setIsOfferNotFound: (state, action:PayloadAction<boolean>) => {
      state.isOfferNotFound = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNearPlacesAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled
        , (state, action) => {
          state.isOfferDataLoading = false;
          state.offer = action.payload;
        })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.isOfferNotFound = true;
      });
  },
  selectors: {
    offer: (state: OfferState) => state.offer,
    nearPlaces: (state: OfferState) => state.nearPlaces,
    reviews: (state: OfferState) => state.reviews,
    isOfferDataLoading: (state: OfferState) => state.isOfferDataLoading,
    isOfferNotFound: (state: OfferState) => state.isOfferNotFound,
  }
});


export const offerAction = {fetchOfferAction, fetchNearPlacesAction, fetchReviewsAction,...offerSlice.actions};

export const offerSelectors = offerSlice.selectors;
