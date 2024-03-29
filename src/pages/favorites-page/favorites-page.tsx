import { Link } from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import { AppRoutes } from '../../constants';
import Layout from '../../components/layout-component/layout-component';
import { offersSelectors } from '../../slices/offers';
import { useAppSelector } from '../../hooks/use-app';

export const FavoritesPage = () => {
  const offers = useAppSelector(offersSelectors.offers);
  const cards = offers.map((i) => (<OfferCard offer = {i} key = {i.id} />));
  return(

    <div className="page">
      <Layout/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cards}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cards}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoutes.Main}>
          <a className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </a>
        </Link>
      </footer>

    </div>

  );
};
export default FavoritesPage;
