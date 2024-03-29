import { Link } from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import { AppRoutes, CITIES } from '../../constants';
import Layout from '../../components/layout-component/layout-component';
import { useAppSelector } from '../../hooks/use-app';
import { favoritesSelectors } from '../../slices/favorites';

export const FavoritesPage = () => {
  const favorites = useAppSelector(favoritesSelectors.favorites);
  return(

    <div className="page">
      <Layout/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.map((i) => (
                <li className="favorites__locations-items" key={i.name}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{i.name}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favorites[i.name]?.map((fav) =>
                      <OfferCard key={fav.id} offer={fav} className='favorites'/>)}
                  </div>
                </li>
              ))}
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
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
