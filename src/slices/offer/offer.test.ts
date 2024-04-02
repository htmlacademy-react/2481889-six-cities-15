import { fetchOfferAction } from '../../store/api-actions';
import { makeMockOffer } from '../../util';
import { offerSlice } from './offer';

describe('Offer slice', () => {
  it('should return same state with empty action', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: true,
      isOfferNotFound: false,
    };

    const emptyAction = {type: ''};

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should initial state with empty action', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: true,
      isOfferNotFound: false,
    };

    const emptyAction = {type: ''};

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set the isOfferDataLoading flag correctly', () => {
    const isLoading = false;
    const action = offerSlice.actions.setIsOfferDataLoading(isLoading);

    const newState = offerSlice.reducer(undefined, action);

    expect(newState.isOfferDataLoading).toEqual(isLoading);
  });

  it('should set the isOfferNotFound flag correctly', () => {
    const notFound = true;
    const action = offerSlice.actions.setIsOfferNotFound(notFound);

    const newState = offerSlice.reducer(undefined, action);

    expect(newState.isOfferNotFound).toEqual(notFound);
  });

  it('should handle fetchOfferAction.pending', () => {

    const action = fetchOfferAction.pending;

    const newState = offerSlice.reducer(undefined, action('', ''));

    expect(newState.isOfferDataLoading).toEqual(true);
  });

  it('should handle fetchOfferAction.fulfilled', () => {

    const mockOffer = makeMockOffer(); // Replace with actual data
    const action = fetchOfferAction.fulfilled(mockOffer, '','');

    const newState = offerSlice.reducer(undefined, action);

    expect(newState.isOfferDataLoading).toEqual(false);
    expect(newState.offer).toEqual(mockOffer);
  });

  it('should handle fetchOfferAction.rejected', () => {

    const action = fetchOfferAction.rejected;

    const newState = offerSlice.reducer(undefined, action(null, '', ''));

    expect(newState.isOfferDataLoading).toEqual(false);
    expect(newState.isOfferNotFound).toEqual(true);
  });
});
