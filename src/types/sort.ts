import { Offer } from './offer';

export type Sort = {
    name: string;
    func: (a: Offer, b: Offer) => number;
}
