import { AppData } from '../../constants';
import { initialState, offerSelectors } from './offer';

describe('Offer selectors', () => {
  const state = {[AppData.Offer]: initialState};

  it('getOffer selector should return the correct offer', () => {
    const {offer} = state[AppData.Offer];
    const result = offerSelectors.getOffer(state);
    expect(result).toEqual(offer);
  });

  it('getIsOfferDataLoading selector should return the correct loading status for an offer', () => {
    const {isOfferDataLoading} = state[AppData.Offer];
    const result = offerSelectors.getIsOfferDataLoading(state);
    expect(result).toEqual(isOfferDataLoading);
  });

  it('getIsOfferNotFound selector should return the correct status indicating whether an offer is not found', () => {
    const {isOfferNotFound} = state[AppData.Offer];
    const result = offerSelectors.getIsOfferNotFound(state);
    expect(result).toEqual(isOfferNotFound);
  });
});
