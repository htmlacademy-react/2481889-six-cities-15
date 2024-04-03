import { CITIES, SORTS } from '../../constants';
import { fetchOffersAction } from '../../store/api-actions';
import { Offer } from '../../types/offer';
import { makeMockOffers } from '../../util/util';
import { offerSlice } from '../offer/offer';
import { OffersState, offersSlice } from './offers';

describe('Offers slice', () => {
  it('should return same state with empty action', () => {
    const expectedState : OffersState = {
      city: CITIES[0],
      offers: [],
      sort: SORTS.Popular,
      isOffersDataLoading: false,
    };

    const emptyAction = {type: ''};

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should initial state with empty action', () => {
    const expectedState : OffersState = {
      city: CITIES[0],
      offers: [],
      sort: SORTS.Popular,
      isOffersDataLoading: false,
    };

    const emptyAction = {type: ''};

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set the city correctly', () => {
    const city = CITIES[1];
    const action = offersSlice.actions.setCity(city);

    const newState = offersSlice.reducer(undefined, action);

    expect(newState.city).toEqual(city);
  });

  it('should set the isOffersDataLoading flag correctly', () => {

    const isLoading = true;
    const action = offersSlice.actions.setIsOffersDataLoading(isLoading);

    const newState = offersSlice.reducer(undefined, action);

    expect(newState.isOffersDataLoading).toEqual(true);
  });

  it('should set the sort correctly', () => {

    const sort = SORTS[1];
    const action = offersSlice.actions.setSort(sort);

    const newState = offersSlice.reducer(undefined, action);

    expect(newState.sort).toEqual(sort);
  });

  it('should set favorite offer correctly', () => {
    const emptyOffer = { id: '1', isFavorite: false } as Offer;
    const initialState: OffersState = {
      city: CITIES[0],
      offers: [emptyOffer],
      sort: SORTS.Popular,
      isOffersDataLoading: false,
    };
    const actionPayload = { offer: emptyOffer, newBool: true };
    const action = offersSlice.actions.setFavoriteOffers(actionPayload);

    const newState = offersSlice.reducer(initialState, action);

    const updatedOffer = newState.offers.find((offer) => offer.id === '1');
    expect(updatedOffer?.isFavorite).toEqual(true);
  });

  it('should handle fetchOffersAction.pending', () => {

    const action = fetchOffersAction.pending;

    const newState = offerSlice.reducer(undefined, action('', undefined));

    expect(newState.isOfferDataLoading).toEqual(true);
  });

  it('should handle fetchOffersAction.fulfilled', () => {

    const mockOffers = makeMockOffers(); // Replace with actual data
    const action = fetchOffersAction.fulfilled(mockOffers, '', undefined);

    const newState = offersSlice.reducer(undefined, action);

    expect(newState.isOffersDataLoading).toEqual(false);
    expect(newState.offers).toEqual(mockOffers);
  });
});
