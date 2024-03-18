import { User } from './user';

export type Review = {
    id: string;
    date: Date;
    user: User;
    comment: string;
    rating: number;
};

export type Reviews = Review[]
