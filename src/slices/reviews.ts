import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { fetchReviewsAction } from '../store/api-actions';
import { Reviews } from '../types/review';
import { AppData } from '../constants';

export type ReviewsState = {
    reviews: Reviews;
    isReviewsDataLoading: boolean;
}

const initialState: ReviewsState = {
  reviews: [],
  isReviewsDataLoading: true,
};

export const reviewsSlice = createSlice({
  initialState, name: AppData.Reviews,
  reducers: {
    setIsReviewsDataLoading: (state, action:PayloadAction<boolean>) => {
      state.isReviewsDataLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.
      addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsDataLoading = false;
        state.reviews = action.payload;
      }).
      addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      });
  },
  selectors: {
    reviews: (state: ReviewsState) => state.reviews,
    isReviewsDataLoading: (state: ReviewsState) => state.isReviewsDataLoading,
  },

},
);

export const reviewsSelectors = reviewsSlice.selectors;

export const { setIsReviewsDataLoading } = reviewsSlice.actions;

