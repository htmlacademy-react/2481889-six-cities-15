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
