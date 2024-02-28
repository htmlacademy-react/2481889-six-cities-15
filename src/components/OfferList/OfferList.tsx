import { useState } from 'react';
import { offerType } from '../../types/offer';
import OfferCard from '../OfferCard/OfferCard';

type OfferListProps = {
    offers: offerType[];
}

export function OfferList(props: OfferListProps){
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState(props.offers[0].id);
  const handleCardHover = (id:string) => {
    setActiveCard(id);
    // eslint-disable-next-line no-console
    console.log(activeCard);
  };
  const cards = props.offers.map((i) =>
    (<OfferCard key={i.id}
      id={i.id}
      title={i.title}
      type={i.type}
      price={i.price}
      previewImage={i.previewImage}
      isFavorite={i.isFavorite}
      isPremium={i.isPremium}
      rating={i.rating}
      onMouseOver={() => handleCardHover(i.id)}
    // eslint-disable-next-line react/jsx-closing-bracket-location
    />
    ));
  return (
    <>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
                Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {cards}
      </div>
    </>
  );
}
