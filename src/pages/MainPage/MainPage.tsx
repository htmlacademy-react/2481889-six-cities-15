
import { OfferList } from '../../components/OfferList/OfferList';
import { Offer } from '../../types/offer';
import { FC, useState } from 'react';
import Map from '../../components/Map/Map';
import { Amsterdam } from '../../mocks/city';
import { Layout } from '../../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import { SortForm } from '../../components/SortForm/SortForm';
import { Nullable } from '../../types/nullable';

export type MainPageProps = {offers:Offer[]}

const cities = ['Paris', 'Collogne', 'Brussels','Hamburg', 'Amsterdam', 'Dusseldorf'].map((city) => (
  <li className="locations__item" key={city}>
    <NavLink className={({isActive}) => !isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to={`/${city}`}>
      <span>{city}</span>
    </NavLink>
  </li>));

export const MainPage : FC<MainPageProps> = (props : MainPageProps) => {
  const [activeCard, setActiveCard] = useState<Nullable<Offer>>(null);
  return (
    <Layout>
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                {cities}
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">312 places to stay in Amsterdam</b>
                <SortForm/>
                <OfferList type="cities" offers={props.offers} setActiveCard={setActiveCard}/>
              </section>
              <div className="cities__right-section">
                <Map className='cities__map' city={Amsterdam} offers={props.offers} selectedOffer={activeCard}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};
export default MainPage;
