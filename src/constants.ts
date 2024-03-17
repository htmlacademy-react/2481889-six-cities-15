import { City } from './types/city';
import { Sort } from './types/sort';


export const AppRoutes = {
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


export const SORTS: { [key: string]: Sort } = {
  Popular: {
    name: 'Popular',
    func: () => 0 // Функция сортировки для Popular (в данном случае не изменяет порядок)
  },
  PriceHighToLow: {
    name: 'Price: high to low',
    func: (a, b) => b.price - a.price // Функция сортировки для сортировки по цене от большей к меньшей
  },
  PriceLowToHigh: {
    name: 'Price: low to high',
    func: (a, b) => a.price - b.price // Функция сортировки для сортировки по цене от меньшей к большей
  },
  TopRatedFirst: {
    name: 'Top rated first',
    func: (a, b) => b.rating - a.rating // Функция сортировки для сортировки по рейтингу от высшего к низшему
  },
};


