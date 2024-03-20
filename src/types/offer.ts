import { City } from './city';
import { Host } from './host';

export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    previewImage: string;
    city: City;
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: string[];
    host: Host;
    images: string[];
    maxAdults: number;
}

export type OfferData = string

export type Offers = Offer[]
