import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import Layout from '../../components/layout-component/layout-component';
import { useAppSelector } from '../../hooks/use-app';
import { favoritesSelectors } from '../../slices/favorites';
import FavoritesCity from './favorites-city/favorites-city';
import NoFavorites from './no-favorites/no-favorites';

export const FavoritesPage = () => {
  const favoritesAmount = useAppSelector(favoritesSelectors.favoritesAmount);
  const isFavoritesDataLoading = useAppSelector(favoritesSelectors.isFavoritesDataLoading);
  return(

    <div className="page">
      <Layout/>
      {!isFavoritesDataLoading && favoritesAmount === 0 && <NoFavorites/>}
      {!isFavoritesDataLoading && favoritesAmount !== 0 && <FavoritesCity/>}
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
