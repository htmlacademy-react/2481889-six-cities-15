import { AppData } from '../../constants';
import { initialState, nearPlacesSelectors } from './near-places';

describe('Near Places selectors', () => {
  const state = { [AppData.NearPlaces]: initialState };

  it('getNearPlaces selector should return the correct near places', () => {
    const { nearPlaces } = state.nearPlaces;
    const result = nearPlacesSelectors.getNearPlaces(state);
    expect(result).toEqual(nearPlaces);
  });

  it('getIsNearPlacesDataLoading selector should return the correct loading status', () => {
    const { isNearPlacesDataLoading } = state.nearPlaces;
    const result = nearPlacesSelectors.getIsNearPlacesDataLoading(state);
    expect(result).toEqual(isNearPlacesDataLoading);
  });
});
