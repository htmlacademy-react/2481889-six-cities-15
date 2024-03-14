import { OfferList } from '../../components/OfferList/OfferList';
import { Offer } from '../../types/offer';
import { useState } from 'react';
import Map from '../../components/Map/Map';
import { Layout } from '../../components/Layout/Layout';
import { SortForm } from '../../components/SortForm/SortForm';
import { Nullable } from '../../types/nullable';
import { CitiesList } from '../../components/CitiesList/CitiesList';
import { useAppSelector } from '../../hooks/use-app';
import { City } from '../../types/city';
import { CITIES, Sorts } from '../../constants';

export const MainPage = () => {
  const getOffersFromCity = (city:City, offers: Offer[]) => offers.filter((i) => i.city.name === city.name);
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => getOffersFromCity(city, state.offers));
  const sort = useAppSelector((state) => state.sort);
  const getSortOffers = () => {
    switch (sort) {
      case Sorts.Popular:
        return offers;
      case Sorts.PriceHighToLow:
        return offers.sort((a, b) => b.price - a.price);
      case Sorts.PriceLowToHigh:
        return offers.sort((a, b) => a.price - b.price);
      case Sorts.TopRatedFirst:
        return offers.sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  };

  const [activeCard, setActiveCard] = useState<Nullable<Offer>>(null);
  return (
    <Layout>
      <div className="page page--gray page--main">
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
                <b className="places__found">{offers.length} places to stay in {city.name}</b>
                <SortForm/>
                <OfferList type="cities" offers={getSortOffers()} setActiveCard={setActiveCard}/>
              </section>
              <div className="cities__right-section">
                <Map className='cities__map' city={city} offers={offers} selectedOffer={activeCard}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};
export default MainPage;
