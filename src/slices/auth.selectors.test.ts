import { AppData } from '../constants';
import { initialState, authSelectors } from './auth';

describe('Auth selectors', () => {
  const state = { [AppData.Auth]: initialState };

  it('getAuthorizationStatus selector should return the correct authorization status', () => {
    const { authorizationStatus } = state[AppData.Auth];
    const result = authSelectors.getAuthorizationStatus(state);
    expect(result).toEqual(authorizationStatus);
  });

  it('getUser selector should return the correct user data', () => {
    const { user } = state[AppData.Auth];
    const result = authSelectors.getUser(state);
    expect(result).toEqual(user);
  });
});
