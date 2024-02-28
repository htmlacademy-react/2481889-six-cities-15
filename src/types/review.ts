import { user } from "./user";

export type Review = {
    id: string;
    date: string;
    user: user;
    comment: string;
    rating: number;
};
