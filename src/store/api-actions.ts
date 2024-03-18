import {AxiosInstance} from 'axios';
import { createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken, dropToken} from '../services/token';
import { AppDispatch, State } from '../types/store';
import { offersAction } from '../slices/offers';
import { APIRoute, AppRoutes, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../constants';
import { AuthData } from '../types/auth-data';
import { Offer, OfferData, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { setAuthorizationStatus } from '../slices/auth';
import { store } from '.';
import { setError } from '../slices/global';
import { setIsOfferDataLoading, setIsOfferNotFound, setNearPlaces, setOffer, setReviews } from '../slices/offer';
import { Reviews } from '../types/review';


export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const redirectToRoute = createAction<AppRoutes>('redirectToRoute');
export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(offersAction.setIsOffersDataLoading(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(offersAction.setIsOffersDataLoading(false));
    dispatch(offersAction.setOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, OfferData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setIsOfferDataLoading(true));
    const {data} = await api.get<Offer>(APIRoute.Offer.replace(':id', id));
    if(!data) {
      dispatch(setIsOfferNotFound(true));
    } else{
      dispatch(setIsOfferDataLoading(false));
      dispatch(setOffer(data));
    }
  },
);

export const fetchNearPlacesAction = createAsyncThunk<void, OfferData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.NearPlaces.replace(':id', id));
    dispatch(setNearPlaces(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, OfferData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(APIRoute.Reviews.replace(':id', id));
    dispatch(setReviews(data));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoutes.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoutes.Login));
  },
);


