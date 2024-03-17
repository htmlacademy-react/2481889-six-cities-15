import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { Nullable } from '../../types/nullable';

type OfferListProps = {offers:Offer[];
   type:string;
   setActiveCard?:(offer:Nullable<Offer>) => void;
  };

export function OfferList(props: OfferListProps){
  const className = (type:string)=>{
    switch(type){
      case 'cities':
        return 'cities__places-list places__list tabs__content';
      case 'near-places':
        return 'near-places__list places__list';
    }
  };


  const cards = props.offers.map((i) =>
    (<OfferCard key={i.id} offer={i} setActiveCard={props.setActiveCard} className={`${props.type}`}/>));

  return (
    <div className={className(props.type)}>
      {cards}
    </div>
  );
}
