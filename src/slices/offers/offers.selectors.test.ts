import { AppData } from '../../constants';
import { initialState, offersSelectors } from './offers';

describe('Offers selectors', () => {
  const state = {[AppData.Offers]: initialState};

  it('getCity selector should return the correct city', () => {
    const {city} = state[AppData.Offers];
    const result = offersSelectors.getCity(state);
    expect(result).toEqual(city);
  });

  it('getOffers selector should return the correct offers based on city and sort', () => {
    const {offers, city, sort} = state[AppData.Offers];
    const expectedOffers = offers.filter((offer) => offer.city.name === city.name).sort(sort.func);
    const result = offersSelectors.getOffersByCityAndSort(state);
    expect(result).toEqual(expectedOffers);
  });

  it('getSort selector should return the correct sort value', () => {
    const {sort} = state[AppData.Offers];
    const result = offersSelectors.getSort(state);
    expect(result).toEqual(sort);
  });

  it('getIsOffersDataLoading selector should return the correct loading status', () => {
    const {isOffersDataLoading} = state[AppData.Offers];
    const result = offersSelectors.getIsOffersDataLoading(state);
    expect(result).toEqual(isOffersDataLoading);
  });
});
