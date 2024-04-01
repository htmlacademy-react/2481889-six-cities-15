import OfferList from '../../../components/offer-list/offer-list';
import SortForm from '../../../components/sort-form/sort-form';
import Map from '../../../components/map-component/map-component';
import { useAppSelector } from '../../../hooks/use-app';
import { offersSelectors } from '../../../slices/offers';
import { Nullable } from '../../../types/nullable';
import { memo, useState } from 'react';
import { Offer } from '../../../types/offer';

const OffersCity = () => {
  const city = useAppSelector(offersSelectors.getCity);
  const offers = useAppSelector(offersSelectors.getOffers);
  const [activeCard, setActiveCard] = useState<Nullable<Offer>>(null);
  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} {offers.length > 1 ? 'places' : 'place' } to stay in {city.name}</b>
        <SortForm/>
        <OfferList type="cities" offers={offers} setActiveCard={setActiveCard}/>
      </section>
      <div className="cities__right-section">
        <Map className='cities__map' city={city} offers={offers} selectedOffer={activeCard}/>
      </div>
    </div>);
};

const MemorizedOffersCity = memo(OffersCity);
export default MemorizedOffersCity;
