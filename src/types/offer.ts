import { host } from './host';

export type offerType = {
    id: string;
    title: string;
    type: string;
    price: number;
    previewImage: string;
    city: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
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
    host: host;
    images: string[];
    maxAdults: number;
}
