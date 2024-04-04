import { memo } from 'react';
import OfferCard from '../../../components/offer-card/offer-card';
import { CITIES } from '../../../constants';
import { useAppSelector } from '../../../hooks/use-app';
import { favoritesSelectors } from '../../../slices/favorites/favorites';
import { Link } from 'react-router-dom';

const FavoritesCity = () => {
  const favoritesByCity = useAppSelector(favoritesSelectors.getFavoritesByCity);
  return(
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {CITIES.map((i) => {
              const favoriteCitiesLength = favoritesByCity[i.name]?.length;
              if (favoriteCitiesLength !== undefined && favoriteCitiesLength > 0) {
                return (
                  <li className="favorites__locations-items" key={i.name}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link to ={`/${i.name}`}className="locations__item-link" >
                          <span>{i.name}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoritesByCity[i.name]?.map((fav) =>
                        <OfferCard key={fav.id} offer={fav} className='favorites'/>)}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};

const MemorizedFavoritesCity = memo(FavoritesCity);
export default MemorizedFavoritesCity;
