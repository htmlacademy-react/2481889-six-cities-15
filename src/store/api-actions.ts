import {AxiosInstance} from 'axios';
import { createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken, dropToken} from '../services/token';
import { AppDispatch, State } from '../types/store';
import { APIRoute, AppRoutes } from '../constants';
import { AuthData } from '../types/auth-data';
import { Offer, OfferData, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { setUser } from '../slices/auth';
import { Reviews } from '../types/review';
import { ReviewData } from '../types/review-action';
import { toast } from 'react-toastify';
import { FavoriteData } from '../types/favorite-data';


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


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: user} = await api.get<UserData>(APIRoute.Login);
    dispatch(setUser(user));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(setUser(user));
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
    dispatch(redirectToRoute(AppRoutes.Login));
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postReview',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    try{
      await api.post<UserData>(APIRoute.Reviews.replace(':id',id)
        , {comment, rating});
      dispatch(fetchReviewsAction(id));
    } catch (err) {
      toast.warn('Ошибка при создании комментария');
    }
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

export const postFavoriteAction = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postFavorite',
  async ({id, newBool}, {dispatch, extra: api}) => {
    try{
      await api.post<UserData>(`${APIRoute.Favorite}/${id}/${Number(newBool)}`);
      dispatch(fetchFavoritesAction());
    } catch (err) {
      toast.warn('Ошибка в смене флага избранного');
    }
  },
);
