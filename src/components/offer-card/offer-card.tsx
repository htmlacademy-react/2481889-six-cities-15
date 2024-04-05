import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { Offer } from '../../types/offer';
import { FC, memo} from 'react';
import { Nullable } from '../../types/nullable';
import FavoriteButton from '../favorite-button/favorite-button';

type OfferCardsOffer = {
    offer: Offer;
    setActiveCard?:(offer:Nullable<Offer>) => void;
    className?:string;
}

export const OfferCard : FC<OfferCardsOffer> = ({offer, setActiveCard, className}) =>{

  const handleMouseOn = () => {
    setActiveCard?.(offer);
  };

  const handleMouseOff = () => {
    setActiveCard?.(null);
  };
  return(

    <article
      className={`${className}__card place-card`}
      key={offer.id}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff}
    >

      {offer.isPremium ?
        <div className="place-card__mark"> <span>Premium</span> </div> : null}

      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoutes.Offer.replace(':id', offer.id)} >
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton offer={offer} type='place-card' height={19} width={18} />
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(Math.round(offer.rating) * 100 / 5)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoutes.Offer.replace(':id', offer.id)} >{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>

      </div>
    </article>
  );
};
const MemorizedOfferCard = memo(OfferCard);
export default MemorizedOfferCard;
