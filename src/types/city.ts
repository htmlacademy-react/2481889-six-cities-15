import { Location } from '../types/location';
export type City = {
    name: string;
    location: Location;
  };

export type Point = {
    title: string;
    lat: number;
    lng: number;
  };

export type Points = Point[];
