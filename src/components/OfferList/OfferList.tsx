import { useState } from 'react';
import { offerType } from '../../types/offer';
import { MainPageProps } from '../../pages/MainPage/MainPage';
import { Nullable } from 'vitest';
import OfferCard from '../OfferCard/OfferCard';

type OfferListProps = Pick<MainPageProps,'offers'>

export function OfferList(props: OfferListProps){
  const [, setActiveCard] = useState<Nullable<offerType>>(null);
  const handleCardHover = (offer? : offerType) => {
    setActiveCard(offer || null);
  };
  const cards = props.offers.map((i) =>
    (<OfferCard key={i.id} offer={i} onMouseOver={() => handleCardHover(i)}/>));
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
