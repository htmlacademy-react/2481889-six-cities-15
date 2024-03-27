import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../types/nullable';
import { Offer} from '../types/offer';
import { fetchOfferAction } from '../store/api-actions';
import { AppData } from '../constants';

export type OfferState ={
    offer: Nullable<Offer>;
    isOfferDataLoading: boolean;
    isOfferNotFound: boolean;
}

const initialState: OfferState = {
  offer: null,
  isOfferDataLoading: true,
  isOfferNotFound: false,
};

export const offerSlice = createSlice({
  initialState, name:AppData.Offer,
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
    isOfferDataLoading: (state: OfferState) => state.isOfferDataLoading,
    isOfferNotFound: (state: OfferState) => state.isOfferNotFound,
  }
});


export const offerAction = {...offerSlice.actions};

export const offerSelectors = offerSlice.selectors;
