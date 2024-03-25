import OfferList from '../../components/offer-list/offer-list';
import { Offer } from '../../types/offer';
import { useState } from 'react';
import Map from '../../components/map-component/map-component';
import Layout from '../../components/layout-component/layout-component';
import SortForm from '../../components/sort-form/sort-form';
import { Nullable } from '../../types/nullable';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/use-app';
import { CITIES} from '../../constants';
import { offersSelectors } from '../../slices/offers';

export const MainPage = () => {
  const city = useAppSelector(offersSelectors.city);
  const offers = useAppSelector(offersSelectors.offers);
  const sort = useAppSelector(offersSelectors.sort);

  const [activeCard, setActiveCard] = useState<Nullable<Offer>>(null);
  return (
    <div className="page page--gray page--main">
      <Layout/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {<CitiesList cities={CITIES}/>}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.filter((i) => i.city.name === city.name).length} places to stay in {city.name}</b>
              <SortForm/>
              <OfferList type="cities" offers={offers
                .sort(sort.func)} setActiveCard={setActiveCard}
              />
            </section>
            <div className="cities__right-section">
              <Map className='cities__map' city={city} offers={offers} selectedOffer={activeCard}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MainPage;
