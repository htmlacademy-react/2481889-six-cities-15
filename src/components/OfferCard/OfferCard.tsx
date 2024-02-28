import { Link } from 'react-router-dom';
import { routes } from '../../constants';

type OfferCardsProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    previewImage: string;
    // eslint-disable-next-line react/no-unused-prop-types
    isFavorite: boolean;
    isPremium: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    rating: number;
    onMouseOver:() => void;
}

export function OfferCard(props : OfferCardsProps){
  return(
    <Link to={routes.Offer.replace(':id', props.id)} >
      <article className="cities__card place-card" key={props.id} onMouseOver={props.onMouseOver}>
        {props.isPremium ?
          <div className="place-card__mark"> <span>{props.isPremium}</span> </div> : null}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={props.previewImage} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{props.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${props.rating * 20}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{props.title}</a>
          </h2>
          <p className="place-card__type">{props.type}</p>
        </div>
      </article>
    </Link>
  );
}

export default OfferCard;
