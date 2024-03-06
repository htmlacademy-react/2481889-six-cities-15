import { useState } from 'react';
import { Offer } from '../../types/offer';
import OfferCard from '../OfferCard/OfferCard';
import { Nullable } from '../../types/nullable';

type OfferListProps = {offers:Offer[]; type:string};

export function OfferList(props: OfferListProps){
  const className = (type:string)=>{
    switch(type){
      case 'cities':
        return 'cities__places-list places__list tabs__content';
      case 'near-places':
        return 'near-places__list places__list';
    }
  };

  const [, setActiveCard] = useState<Nullable<Offer>>(null);

  const cards = props.offers.map((i) =>
    (<OfferCard key={i.id} offer={i} setActiveCard={setActiveCard} className={`${props.type}`}/>));

  return (
    <div className={className(props.type)}>
      {cards}
    </div>
  );
}
