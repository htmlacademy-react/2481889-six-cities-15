import { CITIES } from './constants';
import { Offer } from './types/offer';
import {internet, random, datatype} from 'faker';
import { UserData } from './types/user-data';
import { Review } from './types/review';
import { AuthData } from './types/auth-data';
import { Action } from '@reduxjs/toolkit/react';

export const makeMockOffer = () :Offer => ({
  id: datatype.uuid(),
  category: datatype.string(),
  title: random.words(),
  type: random.word(),
  price: datatype.number(),
  previewImage: internet.avatar(),
  city: CITIES[Math.floor(Math.random() * CITIES.length)],
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: random.words(),
  bedrooms: datatype.number(),
  goods: [random.word(), random.word(), random.word()],
  host: {
    name: internet.userName(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar(),
  },
  images: [internet.url(), internet.url(), internet.url()],
  maxAdults: datatype.number(),
});

export const makeMockOffers = () => (Array(30).fill(null).map(() => makeMockOffer()));

export const makeMockUser = () : UserData =>
  ({
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
    email: datatype.boolean(),
    token: datatype.string(),
  });

export const makeMockReview = () : Review =>
  ({
    id: datatype.uuid(),
    date: new Date('2017-02-01'),
    user: makeMockUser(),
    comment: random.words(),
    rating: datatype.number(),
  });

export const makeMockAuthData = () :AuthData =>
  (
    {
      login: internet.userName(),
      password: internet.password(),
    }
  );

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const formatDate = (date: Date): string => {
  const options : Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' } as const;
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
