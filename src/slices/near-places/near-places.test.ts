import { fetchNearPlacesAction } from '../../store/api-actions';
import { makeMockOffers } from '../../util';
import { nearPlacesSlice } from './near-places';

describe('Near Places slice', () => {

  it('should return same state with empty action', () => {
    const expectedState = {
      nearPlaces: [],
      isNearPlacesDataLoading: true,
    };

    const emptyAction = {type: ''};

    const result = nearPlacesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should initial state with empty action', () => {
    const expectedState = {
      nearPlaces: [],
      isNearPlacesDataLoading: true,
    };

    const emptyAction = {type: ''};

    const result = nearPlacesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set the isNearPlacesDataLoading flag correctly', () => {

    const isLoading = false;
    const action = nearPlacesSlice.actions.setIsNearPlacesDataLoading(isLoading);

    const newState = nearPlacesSlice.reducer(undefined, action);

    expect(newState.isNearPlacesDataLoading).toEqual(isLoading);
  });

  it('should handle fetchNearPlacesAction.pending', () => {

    const action = fetchNearPlacesAction.pending;

    const newState = nearPlacesSlice.reducer(undefined, action('',''));

    expect(newState.isNearPlacesDataLoading).toEqual(true);
  });

  it('should handle fetchNearPlacesAction.fulfilled', () => {
    const initialState = {
      isNearPlacesDataLoading: true,
      nearPlaces: [], // Initialize with an empty array or relevant data structure
    };

    const mockNearPlaces = makeMockOffers();
    const action = fetchNearPlacesAction.fulfilled(mockNearPlaces, '', '');

    const newState = nearPlacesSlice.reducer(initialState, action);

    expect(newState.isNearPlacesDataLoading).toEqual(false);
    expect(newState.nearPlaces).toEqual(mockNearPlaces);
  });
});
