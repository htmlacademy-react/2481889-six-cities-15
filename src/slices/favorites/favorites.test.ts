import { fetchFavoritesAction } from '../../store/api-actions';
import { Offer } from '../../types/offer';
import { makeMockOffers } from '../../util';

import { favoritesSlice } from './favorites';

describe('Favorites slice', () => {
  it('should return same state with empty action', () => {
    const expectedState = {
      favorites: [],
      isFavoritesDataLoading: true,
    };

    const emptyAction = {type: ''};

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should initial state with empty action', () => {
    const expectedState = {
      favorites: [],
      isFavoritesDataLoading: true,
    };

    const emptyAction = {type: ''};

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set the isFavoritesDataLoading flag correctly', () => {

    const isLoading = false;
    const action = favoritesSlice.actions.setIsFavoritesDataLoading(isLoading);
    const newState = favoritesSlice.reducer(undefined, action);

    expect(newState.isFavoritesDataLoading).toEqual(isLoading);
  });

  it('should add an offer to favorites correctly', () => {
    const initialState = {
      favorites: [],
      isFavoritesDataLoading: true,
    };

    const newOffer = { id: '1', isFavorite: true } as Offer;
    const action = favoritesSlice.actions.setFavorites({ offer: newOffer, newBool: true });
    const newState = favoritesSlice.reducer(initialState, action);

    expect(newState.favorites).toEqual([newOffer]);
  });

  it('should remove an offer from favorites correctly', () => {
    const offerToRemove = { id: '1' } as Offer;
    const initialState = {
      favorites: [offerToRemove],
      isFavoritesDataLoading: true,
    };

    const action = favoritesSlice.actions.setFavorites({ offer: offerToRemove, newBool: false });

    const newState = favoritesSlice.reducer(initialState, action);

    expect(newState.favorites).not.toContain(offerToRemove);
  });

  it('should handle fetchFavoritesAction.pending', () => {
    const action = fetchFavoritesAction.pending;

    const newState = favoritesSlice.reducer(undefined, action('',undefined));

    expect(newState.isFavoritesDataLoading).toEqual(true);
  });

  it('should handle fetchFavoritesAction.fulfilled', () => {
    const mockFavorites = makeMockOffers();
    const action = fetchFavoritesAction.fulfilled(mockFavorites, '', undefined);

    const newState = favoritesSlice.reducer(undefined, action);

    expect(newState.isFavoritesDataLoading).toEqual(false);
    expect(newState.favorites).toEqual(mockFavorites);
  });

  it('should handle fetchFavoritesAction.rejected', () => {

    const action = fetchFavoritesAction.rejected;

    const newState = favoritesSlice.reducer(undefined, action(null, '', undefined));

    expect(newState.isFavoritesDataLoading).toEqual(false);
  });
});
