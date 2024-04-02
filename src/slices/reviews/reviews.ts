import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { fetchReviewsAction, postReviewAction } from '../../store/api-actions';
import { Reviews } from '../../types/review';
import { AppData, NOTCHECK } from '../../constants';
import { toast } from 'react-toastify';

export type ReviewsState = {
    reviews: Reviews;
    isReviewsDataLoading: boolean;
    blockForm: boolean;
    commentaryText:string;
    rating:number;
}

export const initialState: ReviewsState = {
  reviews: [],
  isReviewsDataLoading: true,
  blockForm: false,
  commentaryText: '',
  rating: NOTCHECK,
};

export const reviewsSlice = createSlice({
  initialState, name: AppData.Reviews,
  reducers: {
    setCommentaryText: (state, action:PayloadAction<string>) => {
      state.commentaryText = action.payload;
    },
    setRating: (state, action:PayloadAction<number>) => {
      state.rating = action.payload;
    },
  },
  extraReducers(builder) {
    builder.
      addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsDataLoading = false;
        state.reviews = action.payload;
        state.rating = NOTCHECK;
        state.commentaryText = '';
      }).
      addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      }).
      addCase(postReviewAction.pending, (state) => {
        state.blockForm = true;
      }).
      addCase(postReviewAction.fulfilled, (state, action) => {
        state.blockForm = false;
        state.reviews.push(action.payload);
        state.rating = NOTCHECK;
        state.commentaryText = '';
      }).
      addCase(postReviewAction.rejected, (state) => {
        toast.warn('Ошибка при отправке комментария');
        state.blockForm = false;
      });
  },
  selectors: {
    getReviews: (state: ReviewsState) => state.reviews,
    getIsReviewsDataLoading: (state: ReviewsState) => state.isReviewsDataLoading,
    getBlockForm: (state: ReviewsState) => state.blockForm,
    getCommentaryText: (state: ReviewsState) => state.commentaryText,
    getRating: (state: ReviewsState) => state.rating,
  },

},
);

export const reviewsSelectors = reviewsSlice.selectors;

export const { setCommentaryText, setRating} = reviewsSlice.actions;

