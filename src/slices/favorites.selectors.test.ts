import { AppData } from '../constants';
import { initialState, favoritesSelectors } from './favorites'; // Assuming you have defined initialState and favoritesSelectors in the favorites file

describe('Favorites selectors', () => {
  const state = { [AppData.Favorites]: initialState };

  it('getFavoritesAmount selector should return the correct number of favorites', () => {
    const { favorites } = state[AppData.Favorites];
    const result = favoritesSelectors.getFavoritesAmount(state);
    expect(result).toEqual(favorites.length);
  });

  it('getFavoritesByCity selector should group favorites by city names correctly', () => {
    const { favorites } = state[AppData.Favorites];
    const groupedFavorites = Object.groupBy(favorites, (favorite) => favorite.city.name); // Assuming Object.groupBy is a correct implementation for grouping by city names
    const result = favoritesSelectors.getFavoritesByCity(state);
    expect(result).toEqual(groupedFavorites);
  });

  it('getIsFavoritesDataLoading selector should return the correct loading status', () => {
    const { isFavoritesDataLoading } = state[AppData.Favorites];
    const result = favoritesSelectors.getIsFavoritesDataLoading(state);
    expect(result).toEqual(isFavoritesDataLoading);
  });
});
