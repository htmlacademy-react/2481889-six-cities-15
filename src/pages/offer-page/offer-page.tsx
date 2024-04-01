import { Navigate, useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import Layout from '../../components/layout-component/layout-component';
import Map from '../../components/map-component/map-component';
import OfferList from '../../components/offer-list/offer-list';
import OfferGallery from './offer-gallery/offer-gallery';
import { useAppSelector } from '../../hooks/use-app';
import { fetchNearPlacesAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { offerSelectors } from '../../slices/offer';
import { useEffect } from 'react';
import { store } from '../../store';
import Spinner from '../../components/spinner/spinner';
import { AppRoutes } from '../../constants';
import { nearPlacesSelectors } from '../../slices/near-places';
import { reviewsSelectors } from '../../slices/reviews';
import FavoriteButton from '../../components/favorite-button/favorite-button';

function OfferPage(): JSX.Element {
  const param = useParams();
  const offerId = param.id;
  const offer = useAppSelector(offerSelectors.getOffer);
  const nearPlaces = useAppSelector(nearPlacesSelectors.getNearPlaces);
  const reviews = useAppSelector(reviewsSelectors.getReviews);
  const isOfferDataLoading = useAppSelector(offerSelectors.getIsOfferDataLoading);
  const isNearPlacesLoading = useAppSelector(nearPlacesSelectors.getIsNearPlacesDataLoading);
  const isReviewsLoading = useAppSelector(reviewsSelectors.getIsReviewsDataLoading);
  const isOfferNotFound = useAppSelector(offerSelectors.getIsOfferNotFound);
  useEffect(() => {
    if (offerId) {
      store.dispatch(fetchOfferAction(offerId));
      store.dispatch(fetchNearPlacesAction(offerId));
      store.dispatch(fetchReviewsAction(offerId));
    }
  }, [offerId]);
  return (

    <div className="page">
      <Layout/>
      {isOfferDataLoading && !isOfferNotFound && <Spinner/>}

      {isOfferNotFound && <Navigate to = {AppRoutes.NotFound}/>}

      {!isOfferDataLoading && offer &&
        <main className="page__main page__main--offer">
          <section className="offer">
            <OfferGallery photos={offer.images}/>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium ? <div className="offer__mark"><span>Premium</span></div> : null}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <FavoriteButton offer={offer} type='offer' width={31} height={33}/>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${Math.round(offer.rating) * 20}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">Whats inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((i)=>
                      <li key={i} className="offer__inside-item">{i}</li>)}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${offer.host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro &&
                    <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    {offer.description}
                  </div>
                </div>
                {isReviewsLoading && <Spinner />}
                {!isReviewsLoading && <ReviewForm offerId={offer.id} reviews={reviews}/>}
              </div>
            </div>
          </section>
          <div className="container">
            {isNearPlacesLoading && <Spinner />}
            {!isNearPlacesLoading &&
            <section className="near-places places">
              <Map className='offer__map' city={offer.city} offers={[offer, ...nearPlaces]} selectedOffer={offer}/>
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <OfferList type="near-places" offers={nearPlaces}/>
            </section>}
          </div>
        </main>}
    </div>

  );
}

export default OfferPage;
