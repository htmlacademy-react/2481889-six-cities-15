import { NOTCHECK } from '../../constants';
import { postReviewAction } from '../../store/api-actions';
import { makeMockReview } from '../../util';
import { reviewsSlice } from './reviews';

describe('Reviews slice', () => {

  it('should return same state with empty action', () => {
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: true,
      blockForm: false,
      commentaryText: '',
      rating: NOTCHECK,
    };

    const emptyAction = {type: ''};

    const result = reviewsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should initial state with empty action', () => {
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: true,
      blockForm: false,
      commentaryText: '',
      rating: NOTCHECK,
    };

    const emptyAction = {type: ''};

    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set the commentary text correctly', () => {

    const newText = 'Great product!';
    const action = reviewsSlice.actions.setCommentaryText(newText);

    const newState = reviewsSlice.reducer(undefined, action);

    expect(newState.commentaryText).toEqual(newText);
  });

  it('should set the rating correctly', () => {

    const newRating = 5;
    const action = reviewsSlice.actions.setRating(newRating);

    const newState = reviewsSlice.reducer(undefined, action);

    expect(newState.rating).toEqual(newRating);
  });

  it('should handle postReviewAction.pending', () => {
    const review = makeMockReview();
    const action = postReviewAction.pending;

    const newState = reviewsSlice.reducer(undefined, action('',review));

    expect(newState.blockForm).toEqual(true);
  });

  it('should handle postReviewAction.fulfilled', () => {
    const mockReview = makeMockReview();
    const action = postReviewAction.fulfilled(mockReview, '', mockReview);

    const newState = reviewsSlice.reducer(undefined, action);

    expect(newState.blockForm).toEqual(false);
    expect(newState.reviews).toContainEqual(mockReview);
    expect(newState.rating).toEqual(NOTCHECK);
    expect(newState.commentaryText).toEqual('');
  });

  it('should handle postReviewAction.rejected', () => {
    const review = makeMockReview();
    const action = postReviewAction.rejected;

    const newState = reviewsSlice.reducer(undefined, action(null, '',review));

    expect(newState.blockForm).toEqual(false);
  });
});
