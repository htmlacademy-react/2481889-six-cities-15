import { AppData } from '../../constants';
import { makeMockOffers } from '../../util';
import { favoritesSelectors } from './favorites'; // Assuming you have defined initialState and favoritesSelectors in the favorites file


describe('Favorites selectors', () => {
  const state = { [AppData.Favorites]:
{
  favorites: makeMockOffers(),
  isFavoritesDataLoading: false,
} };

  it('getFavoritesAmount selector should return the correct number of favorites', () => {
    const { favorites } = state[AppData.Favorites];
    const result = favoritesSelectors.getFavoritesAmount(state);
    expect(result).toEqual(favorites.length);
  });


  it('getIsFavoritesDataLoading selector should return the correct loading status', () => {
    const { isFavoritesDataLoading } = state[AppData.Favorites];
    const result = favoritesSelectors.getIsFavoritesDataLoading(state);
    expect(result).toEqual(isFavoritesDataLoading);
  });
});
