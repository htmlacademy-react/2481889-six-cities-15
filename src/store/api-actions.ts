import {AxiosInstance} from 'axios';
import { createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken, dropToken} from '../services/token';
import { AppDispatch, State } from '../types/store';
import { APIRoute, AppRoutes } from '../constants';
import { AuthData } from '../types/auth-data';
import { Offer, OfferData, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { Review, Reviews } from '../types/review';
import { ReviewData } from '../types/review-data';
import { toast } from 'react-toastify';
import { FavoriteData } from '../types/favorite-data';
import { setFavoriteOffers } from '../slices/offers/offers';
import { setFavorites } from '../slices/favorites/favorites';


export const redirectToRoute = createAction<AppRoutes>('redirectToRoute');

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, OfferData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, { extra: api}) => {
    const {data} = await api.get<Offer>(APIRoute.Offer.replace(':id', id));
    return data;
  },
);

export const fetchNearPlacesAction = createAsyncThunk<Offers, OfferData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearPlaces',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.NearPlaces.replace(':id', id));
    return data.slice(0, 3);
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, OfferData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, { extra: api}) => {
    const {data} = await api.get<Reviews>(APIRoute.Reviews.replace(':id', id));
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: user} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoritesAction());
    return user;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(redirectToRoute(AppRoutes.Main));
    return user;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const postReviewAction = createAsyncThunk<Review, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postReview',
  async ({comment, rating, id}, {extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.Reviews.replace(':id',id)
      , {comment, rating});
    return data;
  },
);


export const postFavoriteAction = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postFavorite',
  async ({offer, newBool}, {dispatch, extra: api}) => {
    try{
      await api.post<UserData>(`${APIRoute.Favorite}/${offer.id}/${Number(newBool)}`);
      dispatch(setFavoriteOffers({offer,newBool}));
      dispatch(setFavorites({offer,newBool}));
    } catch (err) {
      toast.warn('Ошибка в смене флага избранного');
    }
  },
);
