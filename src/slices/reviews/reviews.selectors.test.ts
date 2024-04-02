import { AppData } from '../../constants';
import { initialState, reviewsSelectors } from './reviews';

describe('Reviews selectors', () => {
  const state = { [AppData.Reviews]: initialState
  };

  it('getReviews selector should return the correct reviews', () => {
    const {reviews} = state[AppData.Reviews];
    const result = reviewsSelectors.getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('getIsReviewsDataLoading selector should return the correct loading status', () => {
    const {isReviewsDataLoading} = state[AppData.Reviews];
    const result = reviewsSelectors.getIsReviewsDataLoading(state);
    expect(result).toEqual(isReviewsDataLoading);
  });

  it('getBlockForm selector should return the correct block form value', () => {
    const blockForm = state[AppData.Reviews].blockForm;
    const result = reviewsSelectors.getBlockForm(state);
    expect(result).toEqual(blockForm);
  });

  it('getCommentaryText selector should return the correct commentary text', () => {
    const {commentaryText} = state[AppData.Reviews];
    const result = reviewsSelectors.getCommentaryText(state);
    expect(result).toEqual(commentaryText);
  });

  it('getRating selector should return the correct rating value', () => {
    const {rating} = state[AppData.Reviews];
    const result = reviewsSelectors.getRating(state);
    expect(result).toEqual(rating);
  });
});
