import { City } from './types/city';


export const routes = {
  Login : '/login',
  Favorites : '/favorites',
  Offer : '/offer/:id',
  Main : '/'
} as const;

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }
export const EnumerateConstants = {
  rentAmount:5
} as const;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';


export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 52.3702,
      longitude: 4.8951,
      zoom: 12,},
  },
  {
    name: 'Cologne',
    location: {
      latitude: 52.3702,
      longitude: 4.8951,
      zoom: 12,},
  },
  {
    name: 'Brussels',
    location: {
      latitude: 52.3702,
      longitude: 4.8951,
      zoom: 12,},
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3702,
      longitude: 4.8951,
      zoom: 12,},
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 52.3702,
      longitude: 4.8951,
      zoom: 12,},
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 52.3702,
      longitude: 4.8951,
      zoom: 12,},
  },
];

export const Sorts = {
  Popular : 'Popular',
  PriceHighToLow : 'Price: high to low',
  PriceLowToHigh : 'Price: low to high',
  TopRatedFirst : 'Top rated first',
};


