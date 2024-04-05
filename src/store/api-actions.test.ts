import {postReviewAction, checkAuthAction, fetchFavoritesAction, loginAction, logoutAction, redirectToRoute, fetchNearPlacesAction, fetchReviewsAction} from './api-actions';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { APIRoute } from '../constants';
import { makeMockOffers, makeMockReview } from '../util/util';
import { State } from '../types/store';
import { AuthData } from '../types/auth-data';
import { ReviewData } from '../types/review-data';
import { datatype } from 'faker';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

  let store: ReturnType<typeof mockStoreCreator>;
  beforeEach(() => {
    store = mockStoreCreator({
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    it('should dispatch postReviewAction.pending, postReviewAction.fulfilled when server response 200', async () => {
      const fakeReview : ReviewData = makeMockReview();
      const {id} = fakeReview;
      mockAxiosAdapter.onPost(APIRoute.Reviews.replace(':id', id)).reply(200, fakeReview);

      await store.dispatch(postReviewAction(fakeReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);
    });
  });
  describe('fetchFavoritesAction', () => {
    it('should dispatch fetchFavoritesAction.pending, fetchFavoritesAction.fulfilled when server response 200', async () => {
      const mockFavorites = makeMockOffers();
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);
      await store.dispatch(fetchFavoritesAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;
      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockFavorites);
    });
    it('should dispatch fetchFavoritesAction.pending, fetchFavoritesAction.rejected when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400);
      await store.dispatch(fetchFavoritesAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });
  describe('fetchNearPlaces', () => {
    it('should dispatch fetchNearPlaces.pending, fetchNearPlaces.fulfilled when server response 200', async () => {
      const mockNearPlaces = makeMockOffers();
      const mockId = datatype.uuid();
      mockAxiosAdapter.onGet(APIRoute.NearPlaces.replace(':id',mockId)).reply(200, mockNearPlaces);
      await store.dispatch(fetchNearPlacesAction(mockId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearPlacesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearPlacesAction.fulfilled>;
      expect(extractedActionsTypes).toEqual([
        fetchNearPlacesAction.pending.type,
        fetchNearPlacesAction.fulfilled.type,
      ]);
      expect(fetchNearPlacesActionFulfilled.payload).toEqual(mockNearPlaces);
    });
    it('should dispatch fetchNearPlacesAction.pending, fetchFavoritesAction.rejected when server response 400', async () => {
      const mockId = datatype.uuid();
      mockAxiosAdapter.onGet(APIRoute.NearPlaces.replace(':id', mockId)).reply(400);
      await store.dispatch(fetchNearPlacesAction(mockId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      expect(extractedActionsTypes).toEqual([
        fetchNearPlacesAction.pending.type,
        fetchNearPlacesAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviews', () => {
    it('should dispatch fetchReviews.pending, fetchReviewsPlaces.fulfilled when server response 200', async () => {
      const mockReviews = [makeMockReview()];
      const mockId = datatype.uuid();
      mockAxiosAdapter.onGet(APIRoute.Reviews.replace(':id', mockId)).reply(200, mockReviews);
      await store.dispatch(fetchReviewsAction(mockId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      //const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;
      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
      //expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });
    it('should dispatch fetchReviewsAction.pending, fetchFavoritesAction.rejected when server response 400', async () => {
      const mockId = datatype.uuid();
      mockAxiosAdapter.onGet(APIRoute.Reviews.replace(':id', mockId)).reply(400);
      await store.dispatch(fetchReviewsAction(mockId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });
  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '12345' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200);
      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

  });

});
