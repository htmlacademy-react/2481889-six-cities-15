import { City } from './types/city';
import { Sort } from './types/sort';


export enum AppRoutes {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Main = '/',
  NotFound = '/notfound',
}

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

export const TIMEOUT_SHOW_ERROR = 2000;
export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const TIME_OUT = 5000;
export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
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
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
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


export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Offer = 'offers/:id',
  Reviews = 'comments/:id',
  NearPlaces = 'offers/:id/nearby',
}

export enum AppData {
  Offers = 'offers',
  Auth = 'auth',
  Global = 'global',
  Offer = 'offer'
}
