import { Offer, Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { Nullable } from '../../types/nullable';
import { useAppSelector } from '../../hooks/use-app';
import { offersSelectors } from '../../slices/offers';
import Spinner from '../spinner/spinner';
import { memo, useMemo } from 'react';

type OfferListProps = {
  offers:Offers;
   type:string;
   setActiveCard?:(offer:Nullable<Offer>) => void;
  };

function OfferList({offers, type, setActiveCard}: OfferListProps){
  const isOffersDataLoading = useAppSelector(offersSelectors.isOffersDataLoading);
  const className = (typeOffer : string)=>{
    switch(typeOffer){
      case 'cities':
        return 'cities__places-list places__list tabs__content';
      case 'near-places':
        return 'near-places__list places__list';
    }
  };


  const cards = useMemo(() => offers.map((i) =>
    (<OfferCard key={i.id} offer={i} setActiveCard={setActiveCard} className={`${type}`}/>)), [offers, setActiveCard, type]);

  return (
    <div className={className(type)}>
      {isOffersDataLoading ? <Spinner/> : cards}
    </div>
  );
}
const MemorizedOfferList = memo(OfferList);
export default MemorizedOfferList;
