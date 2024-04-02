import { AuthorizationStatus } from '../../constants';
import { checkAuthAction, loginAction, logoutAction } from '../../store/api-actions';
import { authSlice } from './auth';
import { makeMockAuthData, makeMockUser } from '../../util';

describe('Auth slice', () => {

  it('should return same state with empty action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const emptyAction = {type: ''};

    const result = authSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should initial state with empty action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const emptyAction = {type: ''};

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set the authorization status correctly', () => {
    const newStatus = AuthorizationStatus.Auth;
    const action = authSlice.actions.setAuthorizationStatus(newStatus);

    const newState = authSlice.reducer(undefined, action);

    expect(newState.authorizationStatus).toEqual(newStatus);
  });

  it('should handle checkAuthAction.fulfilled', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const newState = authSlice.reducer(initialState, checkAuthAction.fulfilled(makeMockUser(), '', undefined));

    expect(newState.authorizationStatus).toEqual(AuthorizationStatus.Auth);
  });

  it('should handle checkAuthAction.rejected', () => {
    const newState = authSlice.reducer(undefined, checkAuthAction.rejected(null, '', undefined));

    expect(newState.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });

  it('should handle loginAction.fulfilled', () => {

    const action = loginAction.fulfilled;

    const newState = authSlice.reducer(undefined, action(makeMockUser(),'', makeMockAuthData()));

    expect(newState.authorizationStatus).toEqual(AuthorizationStatus.Auth);
  });

  it('should handle loginAction.rejected', () => {

    const newState = authSlice.reducer(undefined, loginAction.rejected(null, '', makeMockAuthData()));

    expect(newState.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });

  it('should handle logoutAction.fulfilled', () => {
    const newState = authSlice.reducer(undefined, logoutAction.fulfilled(undefined, '', undefined));

    expect(newState.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });
});

